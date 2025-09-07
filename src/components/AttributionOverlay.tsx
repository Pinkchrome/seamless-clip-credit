import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, ExternalLink } from "lucide-react";

interface AttributionProps {
  title: string;
  artist: string;
  owner: string;
  isVisible: boolean;
  onClose: () => void;
}

const AttributionOverlay = ({ title, artist, owner, isVisible, onClose }: AttributionProps) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setOpacity(1);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setOpacity(0);
        setTimeout(onClose, 300);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [isVisible, onClose]);

  if (!isVisible && opacity === 0) return null;

  return (
    <div 
      className="fixed top-4 right-4 z-50 transition-opacity duration-300"
      style={{ opacity }}
    >
      <Card className="bg-editor-panel/95 backdrop-blur-sm border-accent p-4 shadow-accent max-w-80">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Music className="w-5 h-5 text-accent" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-accent text-accent-foreground text-xs">
                Licensed Content
              </Badge>
            </div>
            
            <h4 className="font-semibold text-foreground mb-1 truncate">
              {title}
            </h4>
            
            <p className="text-sm text-muted-foreground mb-1">
              Artist: <span className="text-accent-foreground">{artist}</span>
            </p>
            
            <p className="text-sm text-muted-foreground">
              © {owner}
            </p>
            
            <div className="flex items-center gap-2 mt-3">
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Content used under fair use/licensing
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttributionOverlay;