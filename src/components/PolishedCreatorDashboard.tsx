import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Play, Pause, Square, Upload, Download, Music, Video, Scissors, 
  DollarSign, BarChart3, Settings, Clock, Users, TrendingUp,
  Sparkles, Shield, Award, Zap
} from "lucide-react";
import { toast } from "sonner";
import AttributionOverlay from "./AttributionOverlay";

interface Clip {
  id: string;
  name: string;
  type: "video" | "audio" | "copyrighted";
  duration: number;
  startTime: number;
  attribution?: {
    title: string;
    artist: string;
    owner: string;
    revenueShare: number;
  };
}

interface RevenueShare {
  creatorId: string;
  creatorName: string;
  clipTitle: string;
  watchTime: number;
  revenueShare: number;
  percentage: number;
}

const PolishedCreatorDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showAttribution, setShowAttribution] = useState(false);
  const [currentAttribution, setCurrentAttribution] = useState<{
    title: string;
    artist: string;
    owner: string;
  } | null>(null);
  
  const [totalRevenue] = useState(2847.65);
  const [monthlyGrowth] = useState(23.8);
  const [creatorsServed] = useState(47);
  
  const [clips, setClips] = useState<Clip[]>([
    {
      id: "1",
      name: "Intro - Your Commentary",
      type: "video",
      duration: 60,
      startTime: 0,
    },
    {
      id: "2", 
      name: "Shape of You - Ed Sheeran",
      type: "copyrighted",
      duration: 30,
      startTime: 60,
      attribution: {
        title: "Shape of You",
        artist: "Ed Sheeran",
        owner: "Atlantic Records",
        revenueShare: 72
      }
    },
    {
      id: "3",
      name: "Your Analysis & Commentary",
      type: "video", 
      duration: 45,
      startTime: 90,
    },
    {
      id: "4",
      name: "Anti-Hero - Taylor Swift",
      type: "copyrighted",
      duration: 35,
      startTime: 135,
      attribution: {
        title: "Anti-Hero",
        artist: "Taylor Swift", 
        owner: "Republic Records",
        revenueShare: 75
      }
    },
    {
      id: "5",
      name: "Transition Commentary",
      type: "video",
      duration: 20,
      startTime: 170,
    },
    {
      id: "6",
      name: "Blinding Lights - The Weeknd",
      type: "copyrighted",
      duration: 25,
      startTime: 190,
      attribution: {
        title: "Blinding Lights",
        artist: "The Weeknd",
        owner: "XO/Republic Records",
        revenueShare: 78
      }
    }
  ]);

  const [revenueShares] = useState<RevenueShare[]>([
    {
      creatorId: "1",
      creatorName: "Ed Sheeran",
      clipTitle: "Shape of You",
      watchTime: 180,
      revenueShare: 847.20,
      percentage: 29.8
    },
    {
      creatorId: "2", 
      creatorName: "Taylor Swift",
      clipTitle: "Anti-Hero",
      watchTime: 210,
      revenueShare: 952.30,
      percentage: 33.4
    },
    {
      creatorId: "3",
      creatorName: "The Weeknd", 
      clipTitle: "Blinding Lights",
      watchTime: 150,
      revenueShare: 637.28,
      percentage: 22.4
    },
    {
      creatorId: "curator",
      creatorName: "You (Curator)",
      clipTitle: "Commentary & Curation",
      watchTime: 300,
      revenueShare: 410.87,
      percentage: 14.4
    }
  ]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast(isPlaying ? "Playback paused" : "Playing with FairShare revenue distribution", {
      icon: isPlaying ? "⏸️" : "▶️"
    });
    
    if (!isPlaying) {
      setTimeout(() => {
        const copyrightedClip = clips.find(clip => 
          clip.type === "copyrighted" && 
          currentTime >= clip.startTime && 
          currentTime < clip.startTime + clip.duration
        );
        
        if (copyrightedClip?.attribution) {
          setCurrentAttribution(copyrightedClip.attribution);
          setShowAttribution(true);
        }
      }, 2000);
    }
  };

  const handleAddClip = () => {
    toast("Import clips with automatic revenue sharing detection", {
      icon: "📂"
    });
  };

  const handleExport = () => {
    toast("Exporting with embedded FairShare revenue tracking", {
      icon: "🚀"
    });
  };

  // Simulate real-time updates
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % 240);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-editor-bg text-foreground">
      {/* Premium Header */}
      <header className="bg-editor-panel border-b border-border px-6 py-4 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary shadow-primary">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  FairShare Creator Studio
                </h1>
                <p className="text-sm text-muted-foreground">Professional • Revenue Sharing • Fair Use</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-accent text-accent-foreground gap-1 animate-pulse-primary">
                <Shield className="w-3 h-3" />
                Revenue Sharing Active
              </Badge>
              <Badge variant="outline" className="border-primary text-primary-foreground gap-1">
                <Award className="w-3 h-3" />
                Pro Plan
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleAddClip} className="gap-2 hover:scale-105 transition-transform">
              <Upload className="w-4 h-4" />
              Import Clips
            </Button>
            <Button onClick={handleExport} className="gap-2 bg-gradient-primary hover:opacity-90 shadow-primary hover:scale-105 transition-all">
              <Download className="w-4 h-4" />
              Export & Deploy
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
          <Card className="p-6 bg-gradient-primary border-0 shadow-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-foreground/80 font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-primary-foreground">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-primary-foreground/60 mt-1">+{monthlyGrowth}% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary-foreground/80" />
            </div>
          </Card>
          
          <Card className="p-6 bg-editor-surface border-border hover:border-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Creators Served</p>
                <p className="text-3xl font-bold text-foreground">{creatorsServed}</p>
                <p className="text-xs text-accent mt-1">+12 new partnerships</p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-6 bg-editor-surface border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Fair Share Rate</p>
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-xs text-primary mt-1">Always transparent</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6 bg-editor-surface border-border hover:border-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Success Rate</p>
                <p className="text-3xl font-bold text-foreground">98.7%</p>
                <p className="text-xs text-accent mt-1">Claims resolved fairly</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-editor-surface border border-border shadow-panel">
            <TabsTrigger value="editor" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Scissors className="w-4 h-4" />
              Studio
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <DollarSign className="w-4 h-4" />
              Revenue Hub
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-6 animate-scale-in">
            <div className="flex gap-6 h-[calc(100vh-350px)]">
              {/* Enhanced Sidebar */}
              <aside className="w-80 bg-editor-panel border border-border rounded-xl p-6 overflow-y-auto shadow-panel">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Smart Clips
                  </h3>
                  <Badge className="text-xs bg-accent/20 text-accent-foreground border-accent">
                    {clips.length} clips
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {clips.map((clip, index) => (
                    <Card key={clip.id} 
                         className="p-4 bg-editor-surface border-border hover:border-primary/50 transition-all duration-200 cursor-pointer hover:scale-[1.02] group">
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-lg ${
                          clip.type === "copyrighted" 
                            ? "bg-accent/20 text-accent" 
                            : "bg-primary/20 text-primary"
                        }`}>
                          {clip.type === "copyrighted" ? (
                            <Music className="w-5 h-5" />
                          ) : (
                            <Video className="w-5 h-5" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                            {clip.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              {Math.floor(clip.duration / 60)}:{(clip.duration % 60).toString().padStart(2, '0')}
                            </p>
                          </div>
                          
                          {clip.attribution && (
                            <div className="mt-3 p-3 glass-effect rounded-lg border-accent/20">
                              <p className="text-xs font-medium text-accent-foreground">
                                {clip.attribution.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                by {clip.attribution.artist}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                © {clip.attribution.owner}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-xs border-accent text-accent-foreground">
                                  {clip.attribution.revenueShare}% to creator
                                </Badge>
                                <Badge variant="outline" className="text-xs border-primary text-primary-foreground">
                                  Fair Use
                                </Badge>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </aside>

              {/* Enhanced Main Content */}
              <main className="flex-1 flex flex-col">
                {/* Video Preview */}
                <div className="flex-1 bg-editor-bg">
                  <Card className="h-full bg-editor-surface border-border flex items-center justify-center shadow-panel">
                    <div className="text-center">
                      <div className="w-[600px] h-[340px] bg-gradient-surface rounded-xl mb-6 flex items-center justify-center border border-border shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                        <div className="text-center relative z-10">
                          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/30 mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Video className="w-10 h-10 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">FairShare Preview</h3>
                          <p className="text-muted-foreground mb-1">
                            Revenue automatically shared with creators
                          </p>
                          <p className="text-sm text-accent">
                            Real-time attribution • Transparent earnings
                          </p>
                        </div>
                      </div>
                      
                      {/* Enhanced Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Button 
                          variant="outline" 
                          size="lg"
                          onClick={() => setCurrentTime(0)}
                          className="hover:scale-105 transition-transform"
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          onClick={handlePlayPause}
                          size="lg"
                          className="bg-gradient-primary hover:opacity-90 shadow-primary hover:scale-105 transition-all px-8"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Enhanced Timeline */}
                <div className="h-72 bg-timeline-bg border border-border rounded-xl mt-4 p-6 shadow-panel">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      FairShare Timeline
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground font-mono">
                        {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 4:00
                      </div>
                      <Badge className="bg-primary/20 text-primary-foreground border-primary">
                        Live Revenue Tracking
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Enhanced Timeline Track */}
                  <div className="relative h-24 bg-timeline-track rounded-xl border border-border overflow-hidden shadow-inner">
                    {/* Playhead */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-timeline-playhead z-20 animate-pulse-primary shadow-lg"
                      style={{ left: `${(currentTime / 240) * 100}%` }}
                    >
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-timeline-playhead rounded-full shadow-lg" />
                    </div>
                    
                    {/* Enhanced Clips */}
                    {clips.map((clip) => (
                      <div
                        key={clip.id}
                        className={`absolute top-3 bottom-3 rounded-lg border-2 transition-all duration-200 hover:scale-y-110 hover:z-10 ${
                          clip.type === "copyrighted" 
                            ? "bg-gradient-to-r from-accent/30 to-accent/20 border-accent shadow-accent" 
                            : "bg-gradient-to-r from-primary/30 to-primary/20 border-primary shadow-primary"
                        } flex items-center px-4 group cursor-pointer`}
                        style={{
                          left: `${(clip.startTime / 240) * 100}%`,
                          width: `${(clip.duration / 240) * 100}%`
                        }}
                      >
                        <span className="text-xs font-medium truncate">
                          {clip.name}
                        </span>
                        {clip.attribution && (
                          <Badge className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white">
                            {clip.attribution.revenueShare}%
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary" />
                        <span>Your Content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-accent" />
                        <span>Licensed Content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Fair revenue distribution in real-time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6 animate-scale-in">
            {/* Enhanced Revenue Tracker */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-surface border-border shadow-panel">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-primary" />
                  Revenue Distribution Dashboard
                  <Badge className="bg-accent/20 text-accent-foreground border-accent">Live</Badge>
                </h3>
                
                <div className="space-y-6">
                  {revenueShares.map((share) => (
                    <div key={share.creatorId} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-4 h-4 rounded-full ${
                            share.creatorId === "curator" ? "bg-primary" : "bg-accent"
                          } shadow-lg`} />
                          <div>
                            <p className="font-semibold text-lg">{share.creatorName}</p>
                            <p className="text-sm text-muted-foreground">{share.clipTitle}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold">${share.revenueShare.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{share.percentage}% of total</p>
                        </div>
                      </div>
                      
                      <Progress 
                        value={share.percentage} 
                        className="h-3"
                      />
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {share.watchTime}s watch time
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {share.creatorId === "curator" ? "Your Earnings" : "Creator Share"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 glass-effect rounded-xl border border-accent/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold text-accent-foreground">FairShare Model Benefits</h4>
                  </div>
                  <p className="text-sm text-accent-foreground leading-relaxed">
                    <strong>Revolutionary approach:</strong> Original creators receive revenue proportional to their content's actual engagement. 
                    You earn from your valuable curation, commentary, and compilation work. Everyone wins with transparent, real-time revenue sharing.
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6 animate-scale-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-8 bg-editor-surface border-border shadow-panel">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Performance Analytics</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                    <span className="font-medium">Content ID Success Rate</span>
                    <span className="text-2xl font-bold text-primary">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg">
                    <span className="font-medium">Creator Satisfaction</span>
                    <span className="text-2xl font-bold text-accent">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                    <span className="font-medium">Revenue Growth</span>
                    <span className="text-2xl font-bold text-foreground">+{monthlyGrowth}%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-8 bg-editor-surface border-border shadow-panel">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold">Impact Metrics</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Average Creator Earnings Increase</p>
                    <p className="text-3xl font-bold text-accent">+347%</p>
                    <p className="text-xs text-muted-foreground mt-1">vs traditional blocking</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Content Engagement Boost</p>
                    <p className="text-3xl font-bold text-primary">+89%</p>
                    <p className="text-xs text-muted-foreground mt-1">through fair sharing</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Attribution Overlay */}
      {currentAttribution && (
        <AttributionOverlay
          title={currentAttribution.title}
          artist={currentAttribution.artist}
          owner={currentAttribution.owner}
          isVisible={showAttribution}
          onClose={() => setShowAttribution(false)}
        />
      )}
    </div>
  );
};

export default PolishedCreatorDashboard;