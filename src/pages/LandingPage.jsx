import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import TimetableSection from "../components/TimetableSection";
import PricingSection from "../components/PricingSection";
import AiCoachSection from "../components/AiCoachSection";
import BmiCalculatorSection from "../components/BmiCalculatorSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import EnquirySection from "../components/EnquirySection";

export default function LandingPage() {
  const [enquirySelectedPlan, setEnquirySelectedPlan] = useState("");

  const handleSelectPlan = (duration) => {
    setEnquirySelectedPlan(duration);
    const target = document.querySelector("#enquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Weekly Timetable Section */}
      <TimetableSection />

      {/* 3. Membership Plans & Transparent Pricing */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* 4. AI Athletic Workout Generator */}
      <AiCoachSection />

      {/* 5. Interactive BMI Calculator */}
      <BmiCalculatorSection />

      {/* 6. Facility Image Gallery with Lightbox */}
      <GallerySection />

      {/* 7. Athlete Testimonials */}
      <TestimonialsSection />

      {/* 8. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 9. Membership Enquiry & Guest Pass Booking */}
      <EnquirySection key={enquirySelectedPlan || "default"} selectedPlan={enquirySelectedPlan} />
    </>
  );
}
