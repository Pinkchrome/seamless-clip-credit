import { useState } from "react";
import CreatorDashboard from "@/components/CreatorDashboard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return (
      <div className="min-h-screen flex flex-col">
        <CreatorDashboard />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection onEnterDemo={() => setShowDashboard(true)} />
      <Footer />
    </div>
  );
};

export default Index;
