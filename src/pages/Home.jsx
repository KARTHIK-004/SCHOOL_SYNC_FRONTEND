import Footer from "@/components/Home/Footer";
import CloudLogo from "@/components/Home/CloudLogo";
import FeatureSection from "@/components/Home/FeatureSection";
import HeroSection from "@/components/Home/HeroSection";
import Navbar from "@/components/Home/Navbar";
import PricingSection from "@/components/Home/PricingSection";

import React from "react";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CloudLogo />
      <FeatureSection />
      <PricingSection />
      <Footer />
    </>
  );
}

export default Home;
