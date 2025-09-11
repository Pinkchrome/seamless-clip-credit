import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail, Globe, Heart } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const handleContact = (platform: string) => {
    toast(`Connect with us on ${platform}! This is a demo - real connections coming soon.`);
  };

  return (
    <footer className="bg-editor-panel border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              FairShare Creator Studio
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Revolutionizing content monetization with AI-powered revenue sharing. 
              Ensuring creators get their fair share of viral content profits.
            </p>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleContact("GitHub")}
                className="hover:border-primary/50 hover:bg-primary/5"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleContact("Twitter")}
                className="hover:border-primary/50 hover:bg-primary/5"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleContact("LinkedIn")}
                className="hover:border-primary/50 hover:bg-primary/5"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleContact("Email")}
                className="hover:border-primary/50 hover:bg-primary/5"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Revenue Tracking
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  AI Detection
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Analytics Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  About FairShare
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Creator Stories
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Press Kit
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>using</span>
            <button 
              onClick={() => window.open('https://lovable.dev', '_blank')}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Lovable
            </button>
            <Globe className="w-4 h-4 text-primary" />
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-primary transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-primary transition-colors">
              Terms of Service
            </button>
            <span>© 2024 FairShare. Demo Version.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;