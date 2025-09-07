import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, Clock, TrendingUp } from "lucide-react";

interface RevenueShare {
  creatorId: string;
  creatorName: string;
  clipTitle: string;
  watchTime: number;
  revenueShare: number;
  percentage: number;
}

const RevenueTracker = () => {
  const [totalRevenue] = useState(156.78);
  const [revenueShares] = useState<RevenueShare[]>([
    {
      creatorId: "1",
      creatorName: "Ed Sheeran",
      clipTitle: "Shape of You",
      watchTime: 180,
      revenueShare: 45.20,
      percentage: 28.8
    },
    {
      creatorId: "2", 
      creatorName: "Taylor Swift",
      clipTitle: "Anti-Hero",
      watchTime: 210,
      revenueShare: 52.30,
      percentage: 33.4
    },
    {
      creatorId: "3",
      creatorName: "The Weeknd", 
      clipTitle: "Blinding Lights",
      watchTime: 150,
      revenueShare: 37.28,
      percentage: 23.8
    },
    {
      creatorId: "curator",
      creatorName: "You (Curator)",
      clipTitle: "Commentary & Curation",
      watchTime: 300,
      revenueShare: 22.00,
      percentage: 14.0
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-primary">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary-foreground" />
            <div>
              <p className="text-sm text-primary-foreground/80">Total Revenue</p>
              <p className="text-2xl font-bold text-primary-foreground">${totalRevenue}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-editor-surface border-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Creators Paid</p>
              <p className="text-2xl font-bold">{revenueShares.length - 1}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-editor-surface border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Watch Time</p>
              <p className="text-2xl font-bold">840s</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-editor-surface border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Fair Share Rate</p>
              <p className="text-2xl font-bold">100%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-editor-surface border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Revenue Distribution
        </h3>
        
        <div className="space-y-4">
          {revenueShares.map((share) => (
            <div key={share.creatorId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    share.creatorId === "curator" ? "bg-primary" : "bg-accent"
                  }`} />
                  <div>
                    <p className="font-medium">{share.creatorName}</p>
                    <p className="text-sm text-muted-foreground">{share.clipTitle}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">${share.revenueShare}</p>
                  <p className="text-sm text-muted-foreground">{share.percentage}%</p>
                </div>
              </div>
              
              <Progress 
                value={share.percentage} 
                className="h-2"
              />
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{share.watchTime}s watch time</span>
                <Badge variant="outline" className="text-xs">
                  {share.creatorId === "curator" ? "Your Share" : "Creator Share"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
          <p className="text-sm text-accent-foreground">
            <strong>Fair Revenue Model:</strong> Original creators receive revenue proportional to their content's watch time. 
            You earn from your curation, commentary, and compilation work.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RevenueTracker;