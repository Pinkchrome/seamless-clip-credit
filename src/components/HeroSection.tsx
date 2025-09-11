import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, DollarSign, Users, BarChart3, Shield, Zap, Globe } from "lucide-react";
import { toast } from "sonner";

interface HeroSectionProps {
  onEnterDemo: () => void;
}

const HeroSection = ({ onEnterDemo }: HeroSectionProps) => {
  const handleWatchDemo = () => {
    toast("🎬 Demo video coming soon! For now, explore the live dashboard below.");
    setTimeout(onEnterDemo, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
            🚀 Revolutionary Creator Revenue Platform
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            FairShare
            <br />
            <span className="text-4xl md:text-5xl text-muted-foreground">Creator Studio</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            The world's first AI-powered platform that automatically tracks and distributes 
            <span className="text-primary font-semibold"> fair revenue sharing </span>
            for viral content creators. No more stolen clips. No more lost earnings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={onEnterDemo}
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 shadow-glow group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore Live Demo
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={handleWatchDemo}
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo Video
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">$2.4M</div>
            <div className="text-sm text-muted-foreground">Revenue Tracked</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:border-accent/40 transition-all duration-300">
            <Users className="w-8 h-8 text-accent mx-auto mb-3" />
            <div className="text-3xl font-bold text-accent mb-1">15K+</div>
            <div className="text-sm text-muted-foreground">Creators Protected</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">89%</div>
            <div className="text-sm text-muted-foreground">Revenue Recovery</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:border-accent/40 transition-all duration-300">
            <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
            <div className="text-3xl font-bold text-accent mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Content Protected</div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="p-8 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-primary/10 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary">AI-Powered Detection</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced machine learning identifies your content across all platforms instantly, 
              tracking every view, share, and viral moment in real-time.
            </p>
          </Card>
          
          <Card className="p-8 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-accent/10 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-accent">Automatic Revenue Sharing</h3>
            <p className="text-muted-foreground leading-relaxed">
              Smart contracts ensure instant, transparent revenue distribution. 
              Get paid fairly for every viral clip, every view, every engagement.
            </p>
          </Card>
          
          <Card className="p-8 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-primary/10 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Global Network</h3>
            <p className="text-muted-foreground leading-relaxed">
              Connected across YouTube, TikTok, Instagram, Twitter, and 50+ platforms. 
              Your content is protected everywhere it goes viral.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Ready to Get Your Fair Share?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who've already recovered millions in lost revenue. 
            The future of fair content monetization starts here.
          </p>
          
          <Button 
            onClick={onEnterDemo}
            size="lg" 
            className="text-xl px-12 py-6 bg-gradient-primary hover:opacity-90 shadow-glow group"
          >
            Start Your Free Demo
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;