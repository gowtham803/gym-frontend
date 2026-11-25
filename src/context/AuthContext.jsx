import React, { useState, useEffect, useCallback } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, isFirebaseConfigured } from "../firebase/config";
import { GYM_CONFIG } from "../config/gymConfig";
import { AuthContext } from "./authContextInstance";

const STORAGE_KEY = "sanctum_session_user";

function getInitialUser() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [role, setRole] = useState(() => getInitialUser()?.role || null);
  const [loading, setLoading] = useState(() => (isFirebaseConfigured && auth ? true : false));
  const [error, setError] = useState(null);

  // Helper to determine role from user email, firestore doc, or claims
  const resolveRole = useCallback(async (email, uid = null) => {
    if (GYM_CONFIG.isManagerEmail(email)) {
      return "manager";
    }

    if (isFirebaseConfigured && db && uid) {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.role === "manager") return "manager";
          if (data?.role) return data.role;
        }
      } catch (err) {
        console.warn("Could not query Firestore user profile:", err);
      }
    }

    return "client";
  }, []);

  // Sync state and persist fallback
  const applyUserSession = useCallback(async (userData) => {
    if (!userData) {
      setUser(null);
      setRole(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("sanctum_auth_token");
      return;
    }

    const assignedRole = await resolveRole(userData.email, userData.uid);
    const enrichedUser = {
      ...userData,
      role: assignedRole,
    };

    setUser(enrichedUser);
    setRole(assignedRole);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrichedUser));
    if (enrichedUser.token) {
      localStorage.setItem("sanctum_auth_token", enrichedUser.token);
    }
  }, [resolveRole]);

  // Firebase auth state listener
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const token = await fbUser.getIdToken();
          localStorage.setItem("sanctum_auth_token", token);
          await applyUserSession({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "Sanctum Member",
            photoURL: fbUser.photoURL,
            token,
          });
        } catch (e) {
          console.error("Token resolution error:", e);
        }
      } else {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed?.uid?.startsWith("demo-")) {
              setLoading(false);
              return;
            }
          } catch {
            // ignore
          }
        }
        await applyUserSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [applyUserSession]);

  // 1. Google Sign In
  const loginWithGoogle = async () => {
    setError(null);
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        localStorage.setItem("sanctum_auth_token", token);

        if (db) {
          try {
            await setDoc(
              doc(db, "users", result.user.uid),
              {
                email: result.user.email,
                displayName: result.user.displayName,
                lastLogin: new Date().toISOString(),
                role: GYM_CONFIG.isManagerEmail(result.user.email) ? "manager" : "client",
              },
              { merge: true }
            );
          } catch {
            // non-blocking
          }
        }

        await applyUserSession({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || "Google Athlete",
          photoURL: result.user.photoURL,
          token,
        });

        return result.user;
      } catch (err) {
        console.error("Google sign-in error:", err);
        setError(err.message);
        throw err;
      }
    } else {
      const mockGoogleUser = {
        uid: "demo-google-" + Date.now(),
        email: "athlete.google@sanctum.club",
        displayName: "Marcus Vance",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        token: "demo-bearer-token-" + Date.now(),
      };
      await applyUserSession(mockGoogleUser);
      return mockGoogleUser;
    }
  };

  // 2. Email & Password Sign In
  const loginWithEmail = async (email, password) => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const token = await res.user.getIdToken();
        localStorage.setItem("sanctum_auth_token", token);
        await applyUserSession({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName || email.split("@")[0],
          photoURL: res.user.photoURL,
          token,
        });
        return res.user;
      } catch (err) {
        console.error("Email sign-in error:", err);
        setError(err.message);
        throw err;
      }
    } else {
      const assignedRole = GYM_CONFIG.isManagerEmail(email) ? "manager" : "client";
      const mockUser = {
        uid: "demo-usr-" + Date.now(),
        email,
        displayName: email.split("@")[0].toUpperCase(),
        photoURL: null,
        token: "demo-token-" + Date.now(),
        role: assignedRole,
      };
      await applyUserSession(mockUser);
      return mockUser;
    }
  };

  // 3. Email & Password Sign Up (Client Registration)
  const signupWithEmail = async (email, password, displayName = "") => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(res.user, { displayName });
        }
        const token = await res.user.getIdToken();
        localStorage.setItem("sanctum_auth_token", token);

        if (db) {
          try {
            await setDoc(doc(db, "users", res.user.uid), {
              email: res.user.email,
              displayName: displayName || email.split("@")[0],
              createdAt: new Date().toISOString(),
              role: GYM_CONFIG.isManagerEmail(email) ? "manager" : "client",
            });
          } catch {
            // non-blocking
          }
        }

        await applyUserSession({
          uid: res.user.uid,
          email: res.user.email,
          displayName: displayName || email.split("@")[0],
          photoURL: null,
          token,
        });
        return res.user;
      } catch (err) {
        console.error("Sign up error:", err);
        setError(err.message);
        throw err;
      }
    } else {
      const mockUser = {
        uid: "demo-new-" + Date.now(),
        email,
        displayName: displayName || email.split("@")[0],
        photoURL: null,
        token: "demo-token-" + Date.now(),
        role: "client",
      };
      await applyUserSession(mockUser);
      return mockUser;
    }
  };

  // 4. One-Click Quick Demo Sign In
  const loginAsDemo = async (targetRole = "client") => {
    setError(null);
    if (targetRole === "manager") {
      const demoManager = {
        uid: "demo-manager-root",
        email: "manager@sanctum.club",
        displayName: "Director Alexander Ward",
        photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        role: "manager",
        token: "sanctum-mock-manager-token-verified",
      };
      await applyUserSession(demoManager);
      return demoManager;
    } else {
      const demoAthlete = {
        uid: "demo-athlete-client",
        email: "athlete@sanctum.club",
        displayName: "Vikram Malhotra",
        memberId: "ITK-1042",
        photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        role: "client",
        token: "sanctum-mock-client-token-verified",
      };
      await applyUserSession(demoAthlete);
      return demoAthlete;
    }
  };

  // 5. Sign Out
  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("Firebase sign out:", e);
      }
    }
    await applyUserSession(null);
  };

  // Helper to fetch live token for API headers
  const getIdToken = async () => {
    if (isFirebaseConfigured && auth?.currentUser) {
      try {
        return await auth.currentUser.getIdToken();
      } catch {
        return localStorage.getItem("sanctum_auth_token") || null;
      }
    }
    return localStorage.getItem("sanctum_auth_token") || null;
  };

  const value = {
    user,
    role,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    loginAsDemo,
    logout,
    getIdToken,
    isFirebaseConfigured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
