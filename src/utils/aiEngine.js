// Sanctum Athletic Club — Autonomous AI Athletic & Concierge Engine
// 100% Client-Safe: Zero API key leakage, zero external latency, instant execution on Vercel

export const AI_GOALS = [
  { id: "hypertrophy", label: "Muscle Hypertrophy & Density", icon: "💪" },
  { id: "strength", label: "Maximal Strength & Power", icon: "⚡" },
  { id: "conditioning", label: "Fat Loss & Metabolic Conditioning", icon: "🔥" },
  { id: "mobility", label: "Longevity & Joint Decompression", icon: "🧘" },
];

export const AI_EXPERIENCE = [
  { id: "beginner", label: "Foundational (0–1 Year)" },
  { id: "intermediate", label: "Athletic (1–3 Years)" },
  { id: "advanced", label: "Elite Lifter (3+ Years)" },
];

export const AI_SPLITS = [
  { id: "3", label: "3 Days / Week (Full Body Routine)" },
  { id: "4", label: "4 Days / Week (Upper / Lower Protocol)" },
  { id: "5", label: "5 Days / Week (Push / Pull / Legs + Conditioning)" },
];

// Workout Generator
export function generateAiWorkoutPlan({ goal, experience, daysPerWeek, _equipment = "full_gym" }) {
  const isBeginner = experience === "beginner";
  const isAdv = experience === "advanced";

  let schedule = [];
  let coachingTips = [];

  if (daysPerWeek === "3") {
    schedule = [
      {
        day: "Day 1 — Full Body Power & Anterior Chain",
        focus: "Squat mechanics, Horizontal Push & Core",
        exercises: [
          { name: "Barbell Back Squat", sets: isBeginner ? "3 sets x 8 reps" : "4 sets x 5 reps (RPE 8)", rest: "2-3 mins" },
          { name: "Incline Dumbbell Press", sets: "3 sets x 8-10 reps", rest: "90s" },
          { name: "Chest-Supported T-Bar Row", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Romanian Deadlift (Dumbbells)", sets: "3 sets x 10 reps", rest: "90s" },
          { name: "Hanging Knee / Leg Raises", sets: "3 sets x 12-15 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 2 — Full Body Hinge & Vertical Dynamics",
        focus: "Deadlift mechanics, Overhead Push & Lats",
        exercises: [
          { name: "Conventional or Trap Bar Deadlift", sets: isAdv ? "5 sets x 3 reps" : "3 sets x 6 reps", rest: "2-3 mins" },
          { name: "Standing Overhead Barbell Press", sets: "4 sets x 6-8 reps", rest: "2 mins" },
          { name: "Neutral Grip Lat Pulldown", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Walking Dumbbell Lunges", sets: "3 sets x 12 steps/leg", rest: "90s" },
          { name: "Face Pulls with Cable Rope", sets: "3 sets x 15 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 3 — Full Body Hypertrophy & Recovery Primer",
        focus: "Unilateral stability, Upper Volume & Conditioning",
        exercises: [
          { name: "Bulgarian Split Squats", sets: "3 sets x 8-10 reps/leg", rest: "90s" },
          { name: "Flat Barbell Bench Press", sets: "4 sets x 8 reps", rest: "2 mins" },
          { name: "Single-Arm Dumbbell Row", sets: "3 sets x 10 reps/side", rest: "90s" },
          { name: "Hamstring Curl (Seated or Lying)", sets: "3 sets x 12-15 reps", rest: "60s" },
          { name: "Sled Push or Rowing Ergometer", sets: "6 rounds x 30s sprint / 45s rest", rest: "Turf Zone" },
        ],
      },
    ];
  } else if (daysPerWeek === "4") {
    schedule = [
      {
        day: "Day 1 — Upper Body Strength & Hypertrophy (A)",
        focus: "Bench Press, Heavy Rows & Deltoids",
        exercises: [
          { name: "Barbell Bench Press", sets: "4 sets x 6 reps", rest: "2-3 mins" },
          { name: "Weighted or Assisted Pull-Ups", sets: "4 sets x 6-8 reps", rest: "2 mins" },
          { name: "Dumbbell Seated Shoulder Press", sets: "3 sets x 8-10 reps", rest: "90s" },
          { name: "Incline Chest Supported Row", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Dips & Incline Bicep Curls Super-Set", sets: "3 sets x 12 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 2 — Lower Body Squat & Anterior Focus",
        focus: "Quads, Adductors & Anti-Extension Core",
        exercises: [
          { name: "Barbell Back / Front Squat", sets: "4 sets x 6 reps", rest: "2-3 mins" },
          { name: "Leg Press (Foot Placement Mid-Plate)", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Lying Leg Curls", sets: "3 sets x 12-15 reps", rest: "60s" },
          { name: "Standing Calf Raises (Calibrated)", sets: "4 sets x 15 reps", rest: "60s" },
          { name: "Ab Wheel Rollouts", sets: "3 sets x 10 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 3 — Upper Body Volume & Posterior Chain (B)",
        focus: "Overhead Press, Lats & Arms",
        exercises: [
          { name: "Overhead Barbell Press", sets: "4 sets x 6 reps", rest: "2 mins" },
          { name: "Lat Pulldowns (Wide Grip)", sets: "4 sets x 10-12 reps", rest: "90s" },
          { name: "Incline Dumbbell Fly-to-Press", sets: "3 sets x 10 reps", rest: "90s" },
          { name: "Cable Lateral Raises", sets: "4 sets x 15 reps", rest: "45s" },
          { name: "Overhead Tricep Extensions", sets: "3 sets x 12 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 4 — Lower Body Hinge & Posterior Chain",
        focus: "Deadlifts, Glutes & Unilateral Mechanics",
        exercises: [
          { name: "Barbell Romanian Deadlift", sets: "4 sets x 8 reps", rest: "2 mins" },
          { name: "Bulgarian Split Squats (Dumbbells)", sets: "3 sets x 10 reps/side", rest: "90s" },
          { name: "Glute Ham Developer / Hip Thrust", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Tibialis & Sled Drag", sets: "4 trips of 25m", rest: "60s" },
          { name: "Contrast Therapy Sauna + Plunge", sets: "15m Sauna / 3m Cold Plunge", rest: "Post-Workout" },
        ],
      },
    ];
  } else {
    // 5-day protocol
    schedule = [
      {
        day: "Day 1 — Push (Chest, Shoulders, Triceps)",
        focus: "Horizontal & Vertical Pressing",
        exercises: [
          { name: "Incline Barbell Bench Press", sets: "4 sets x 6-8 reps", rest: "2 mins" },
          { name: "Flat Dumbbell Press", sets: "3 sets x 8-10 reps", rest: "90s" },
          { name: "Standing Military Press", sets: "3 sets x 8 reps", rest: "90s" },
          { name: "Cable Lateral Raises (Lean-Away)", sets: "4 sets x 15 reps", rest: "45s" },
          { name: "Tricep Rope Pushdowns", sets: "3 sets x 12-15 reps", rest: "45s" },
        ],
      },
      {
        day: "Day 2 — Pull (Back, Rear Delts, Biceps)",
        focus: "Vertical Pulling & Thickness",
        exercises: [
          { name: "Barbell Bent-Over Rows", sets: "4 sets x 8 reps", rest: "2 mins" },
          { name: "Neutral Grip Weighted Pull-Ups", sets: "3 sets x 8-10 reps", rest: "90s" },
          { name: "Chest Supported Machine Row", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Rear Delt Reverse Pec Deck", sets: "3 sets x 15 reps", rest: "45s" },
          { name: "Incline Dumbbell Bicep Curls", sets: "3 sets x 10-12 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 3 — Legs (Quad Dominant)",
        focus: "Squat Mechanics & Knee Health",
        exercises: [
          { name: "Barbell High-Bar Back Squat", sets: "4 sets x 6-8 reps", rest: "2-3 mins" },
          { name: "Hack Squat or Leg Press", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Walking Lunges (Turf Track)", sets: "3 sets x 15 steps/leg", rest: "90s" },
          { name: "Leg Extensions (controlled eccentric)", sets: "3 sets x 15 reps", rest: "60s" },
          { name: "Standing Calf Raises", sets: "4 sets x 12 reps", rest: "45s" },
        ],
      },
      {
        day: "Day 4 — Upper Body Hypertrophy & Power",
        focus: "Shoulder Caps, Chest Isolation & Arm Symmetry",
        exercises: [
          { name: "Weighted Dips", sets: "3 sets x 8-10 reps", rest: "90s" },
          { name: "Close-Grip Lat Pulldowns", sets: "3 sets x 10-12 reps", rest: "90s" },
          { name: "Incline Cable Flyes", sets: "3 sets x 12 reps", rest: "60s" },
          { name: "EZ-Bar Preacher Curls", sets: "3 sets x 10 reps", rest: "60s" },
          { name: "Skull Crushers", sets: "3 sets x 12 reps", rest: "60s" },
        ],
      },
      {
        day: "Day 5 — Posterior Chain & MetCon Sprints",
        focus: "Deadlifts, Hamstrings & Anaerobic Capacity",
        exercises: [
          { name: "Deadlifts (Calibrated Eleiko Bar)", sets: "4 sets x 5 reps", rest: "2-3 mins" },
          { name: "Romanian Dumbbell Deadlifts", sets: "3 sets x 10 reps", rest: "90s" },
          { name: "Lying Leg Curls (Drop-set on last)", sets: "3 sets x 12 reps", rest: "60s" },
          { name: "Assault Bike or Sled Sprint Intervals", sets: "8 rounds x 20s Max Effort / 40s Rest", rest: "Recovery" },
          { name: "Cold Plunge (8°C)", sets: "3 minutes immersion", rest: "Finish" },
        ],
      },
    ];
  }

  // Goal-based custom advice
  if (goal === "hypertrophy") {
    coachingTips = [
      "Target 1.8g to 2.2g protein per kg of body mass.",
      "Take every set within 1-2 reps in reserve (RIR 1-2) to maximize motor unit recruitment without systemic burnout.",
      "Track progressive overload weekly by adding either 1 rep or 1.25kg to compound movements.",
    ];
  } else if (goal === "strength") {
    coachingTips = [
      "Rest 3-5 minutes on primary compound lifts to allow full ATP re-synthesis.",
      "Focus on bar speed, bracing intra-abdominal pressure (Valsalva maneuver), and rigid platform foot rooting.",
      "Deload every 5th or 6th week to manage central nervous system fatigue.",
    ];
  } else if (goal === "conditioning") {
    coachingTips = [
      "Maintain heart rate zones: Zone 2 for steady aerobic base, Zone 4-5 for short MetCon bursts.",
      "Hydrate with 500-750ml electrolyte water per hour of high-output conditioning.",
      "Use our contrast sauna/cold plunge to reduce systemic inflammation post-session.",
    ];
  } else {
    coachingTips = [
      "Incorporate 10-15 minutes of dynamic hip, thoracic, and ankle mobility before touching any barbell.",
      "Prioritize unilateral leg training to balance lateral discrepancies.",
      "Utilize the Sanctum infrared sauna for tissue elasticity and cortisol reduction.",
    ];
  }

  return {
    goalName: AI_GOALS.find((g) => g.id === goal)?.label || "Athletic Conditioning",
    experienceName: AI_EXPERIENCE.find((e) => e.id === experience)?.label || "Athletic",
    schedule,
    coachingTips,
  };
}

// Conversational AI Concierge Intelligence
export function queryAiConcierge(rawQuery) {
  const q = (rawQuery || "").toLowerCase().trim();

  // 1. Membership & Pricing queries
  if (q.includes("price") || q.includes("membership") || q.includes("cost") || q.includes("fee") || q.includes("plan")) {
    return {
      text: "Sanctum offers 4 curated tiers: 1 Month (₹3,500), 3 Months (₹9,200), 6 Months (₹16,500 - Most Popular), and 1 Year Black Pass (₹28,000 with 24/7 keycard access). All plans include group classes, lockers, and sauna recovery suites with zero sign-up fees.",
      actionLabel: "View Membership Plans",
      actionTarget: "#plans",
    };
  }

  // 2. Freezing & Pause queries
  if (q.includes("freeze") || q.includes("pause") || q.includes("travel") || q.includes("hold") || q.includes("injury")) {
    return {
      text: "All Sanctum memberships feature complimentary freezing privileges. 1 Month allows up to 7 days, 3 Months up to 14 days, 6 Months up to 30 days, and 1 Year Black Pass allows up to 60 days of total freeze. You can pause anytime directly in the Club Roster portal or via WhatsApp concierge.",
      actionLabel: "Go to Club Roster",
      actionTarget: "#roster",
    };
  }

  // 3. Timetable & Classes
  if (q.includes("class") || q.includes("schedule") || q.includes("time") || q.includes("timetable") || q.includes("session")) {
    return {
      text: "Our structured athletic sessions run daily from 06:30 AM to 08:00 PM. Sessions include Barbell Hypertrophy, MetCon HIIT, Olympic Lifting, Combat Striking, and Athletic Mobility. Every class is capped at 12 athletes to guarantee personal coach attention.",
      actionLabel: "Check Weekly Schedule",
      actionTarget: "#timetable",
    };
  }

  // 4. Cold plunge & Sauna
  if (q.includes("cold") || q.includes("plunge") || q.includes("sauna") || q.includes("recovery") || q.includes("ice")) {
    return {
      text: "Our Recovery Suite features full-spectrum infrared dry saunas (75°C - 85°C) and temperature-regulated cold plunge baths (8°C). Recommended athletic protocol: 15 minutes of infrared heat followed by 2-3 minutes of cold immersion for 2 cycles to accelerate lactic clearance and down-regulate cortisol.",
      actionLabel: "Explore Facility Gallery",
      actionTarget: "#gallery",
    };
  }

  // 5. Guest pass / trial
  if (q.includes("trial") || q.includes("guest") || q.includes("free pass") || q.includes("visit") || q.includes("day pass")) {
    return {
      text: "We provide prospective athletes with a Complimentary 1-Day Guest Pass. This grants full access to the barbell platforms, turf sprint track, and a contrast therapy recovery session. Fill out our quick enquiry form or message concierge on WhatsApp to reserve your slot.",
      actionLabel: "Claim Free Guest Pass",
      actionTarget: "#enquiry",
    };
  }

  // 6. Hours & Location
  if (q.includes("hour") || q.includes("time") || q.includes("open") || q.includes("address") || q.includes("location") || q.includes("where")) {
    return {
      text: "Sanctum Athletic Club is located at 420 Highgate Boulevard, Bangalore. Staffed hours are Monday–Friday (05:30 AM – 11:00 PM) and Weekends (06:30 AM – 09:30 PM). Annual Black Pass members enjoy 24/7 biometric keycard turnstile access.",
      actionLabel: "Contact Concierge",
      actionTarget: "#enquiry",
    };
  }

  // 7. Personal Training
  if (q.includes("trainer") || q.includes("coach") || q.includes("personal training") || q.includes("pt")) {
    return {
      text: "Our coaches hold CSCS / Olympic lifting accreditations and work on a 1:4 floor ratio. We offer tailored 1-on-1 performance packages including biometric InBody scans, movement screening, and personalized periodization programs.",
      actionLabel: "Enquire for Coaching",
      actionTarget: "#enquiry",
    };
  }

  // Default intelligent response
  return {
    text: "Welcome to Sanctum Athletic Club. I can assist you with custom training splits, membership options, class timetables, contrast therapy recovery protocols, or connecting you directly with our front desk concierge.",
    actionLabel: "Explore Classes & Schedules",
    actionTarget: "#timetable",
  };
}
