import Footer from "@/components/Home/Footer";
import CloudLogo from "@/components/Home/CloudLogo";
import FeatureSection from "@/components/Home/FeatureSection";
import HeroSection from "@/components/Home/HeroSection";
import Navbar from "@/components/Home/Navbar";
import PricingSection from "@/components/Home/PricingSection";

import React from "react";
import ContactUs from "@/components/Home/ContactUs";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CloudLogo />
      <FeatureSection />
      <PricingSection />
      <ContactUs />
      <Footer />
    </>
  );
}

export default Home;
