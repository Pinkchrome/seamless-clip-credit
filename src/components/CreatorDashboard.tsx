import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Square, Upload, Download, Music, Video, Scissors, DollarSign, BarChart3, Settings } from "lucide-react";
import { toast } from "sonner";
import AttributionOverlay from "./AttributionOverlay";
import RevenueTracker from "./RevenueTracker";

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

const CreatorDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showAttribution, setShowAttribution] = useState(false);
  const [currentAttribution, setCurrentAttribution] = useState<{
    title: string;
    artist: string;
    owner: string;
  } | null>(null);
  
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
        revenueShare: 70
      }
    },
    {
      id: "3",
      name: "Your Analysis",
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
    }
  ]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast(isPlaying ? "Playback paused" : "Playing video with fair revenue sharing");
    
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
    toast("Import clips with automatic revenue sharing setup");
  };

  const handleExport = () => {
    toast("Exporting with embedded revenue tracking and attribution system");
  };

  return (
    <div className="min-h-screen bg-editor-bg text-foreground">
      {/* Header */}
      <header className="bg-editor-panel border-b border-border px-6 py-4 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FairShare Creator Studio
            </h1>
            <Badge variant="outline" className="border-accent text-accent-foreground">
              Revenue Sharing Enabled
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleAddClip} className="gap-2">
              <Upload className="w-4 h-4" />
              Import Clips
            </Button>
            <Button onClick={handleExport} className="gap-2 bg-gradient-primary hover:opacity-90">
              <Download className="w-4 h-4" />
              Export & Deploy
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-editor-panel">
            <TabsTrigger value="editor" className="gap-2">
              <Scissors className="w-4 h-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Revenue Tracker
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-6">
            <div className="flex gap-6 h-[calc(100vh-200px)]">
              {/* Sidebar - Clip Library */}
              <aside className="w-80 bg-editor-panel border border-border rounded-lg p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-primary" />
                  Fair Share Clips
                </h3>
                
                <div className="space-y-3">
                  {clips.map((clip) => (
                    <Card key={clip.id} className="p-4 bg-editor-surface border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {clip.type === "copyrighted" ? (
                            <Music className="w-5 h-5 text-accent" />
                          ) : (
                            <Video className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{clip.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.floor(clip.duration / 60)}:{(clip.duration % 60).toString().padStart(2, '0')}
                          </p>
                          
                          {clip.attribution && (
                            <div className="mt-2 p-2 bg-accent/10 rounded border-l-2 border-accent">
                              <p className="text-xs font-medium text-accent-foreground">
                                {clip.attribution.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                by {clip.attribution.artist}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                © {clip.attribution.owner}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <Badge variant="outline" className="text-xs border-accent">
                                  {clip.attribution.revenueShare}% to creator
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

              {/* Main Content */}
              <main className="flex-1 flex flex-col">
                {/* Video Preview */}
                <div className="flex-1 bg-editor-bg">
                  <Card className="h-full bg-editor-surface border-border flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-96 h-56 bg-timeline-bg rounded-lg mb-6 flex items-center justify-center border border-border">
                        <div className="text-center">
                          <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Fair Share Preview</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Revenue automatically shared with creators
                          </p>
                        </div>
                      </div>
                      
                      {/* Playback Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setCurrentTime(0)}
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          onClick={handlePlayPause}
                          className="bg-gradient-primary hover:opacity-90 shadow-primary"
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Enhanced Timeline */}
                <div className="h-80 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border border-border/50 rounded-xl mt-4 p-6 shadow-elegant">
                  {/* Timeline Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Scissors className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
                          Fair Share Timeline
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Professional timeline with revenue tracking
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
                        <span className="text-sm font-mono text-primary">
                          {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 4:30
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="w-4 h-4" />
                        Timeline Settings
                      </Button>
                    </div>
                  </div>
                  
                  {/* Timeline Ruler */}
                  <div className="relative mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span>{Math.floor((i * 27) / 60)}:{((i * 27) % 60).toString().padStart(2, '0')}</span>
                          <div className="w-px h-2 bg-border mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Main Timeline Track */}
                  <div className="relative h-24 bg-gradient-to-r from-background/50 via-background/30 to-background/50 rounded-xl border border-border/50 shadow-inner overflow-hidden backdrop-blur-sm">
                    {/* Grid Lines */}
                    <div className="absolute inset-0">
                      {Array.from({ length: 27 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 w-px bg-border/30"
                          style={{ left: `${(i / 27) * 100}%` }}
                        />
                      ))}
                    </div>
                    
                    {/* Playhead */}
                    <div 
                      className="absolute top-0 bottom-0 z-20 transition-all duration-300 ease-out"
                      style={{ left: `${(currentTime / 270) * 100}%` }}
                    >
                      <div className="w-0.5 h-full bg-gradient-to-b from-primary via-primary to-primary/50 shadow-glow" />
                      <div className="absolute -top-2 -left-2 w-5 h-5 bg-primary rounded-full shadow-glow animate-pulse" />
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-background rounded-full border-2 border-primary" />
                    </div>
                    
                    {/* Enhanced Clips */}
                    {clips.map((clip, index) => (
                      <div
                        key={clip.id}
                        className={`absolute top-3 bottom-3 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer group shadow-lg ${
                          clip.type === "copyrighted" 
                            ? "bg-gradient-to-r from-accent/30 via-accent/20 to-accent/30 border-2 border-accent/50 shadow-accent/20" 
                            : "bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 border-2 border-primary/50 shadow-primary/20"
                        }`}
                        style={{
                          left: `${(clip.startTime / 270) * 100}%`,
                          width: `${Math.max((clip.duration / 270) * 100, 8)}%`
                        }}
                      >
                        {/* Clip Icon */}
                        <div className={`absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded ${
                          clip.type === "copyrighted" ? "bg-accent/20" : "bg-primary/20"
                        }`}>
                          {clip.type === "copyrighted" ? (
                            <Music className="w-3 h-3 text-accent" />
                          ) : (
                            <Video className="w-3 h-3 text-primary" />
                          )}
                        </div>
                        
                        {/* Clip Content */}
                        <div className="pl-8 pr-3 py-2 h-full flex items-center justify-between">
                          <span className="text-xs font-medium truncate text-foreground/90">
                            {clip.name}
                          </span>
                          
                          {/* Revenue Badge */}
                          {clip.attribution && (
                            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                              <Badge className="text-xs bg-accent/90 text-accent-foreground shadow-lg">
                                {clip.attribution.revenueShare}%
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        {/* Hover Effect */}
                        <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          clip.type === "copyrighted" 
                            ? "bg-gradient-to-r from-accent/10 to-accent/5" 
                            : "bg-gradient-to-r from-primary/10 to-primary/5"
                        }`} />
                        
                        {/* Clip Number */}
                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-background border-2 border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Timeline Footer */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gradient-to-r from-primary/50 to-primary border border-primary/50" />
                        <span className="text-sm text-muted-foreground">Your Content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gradient-to-r from-accent/50 to-accent border border-accent/50" />
                        <span className="text-sm text-muted-foreground">Copyrighted Content</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-center">
                      <p className="text-muted-foreground">
                        <span className="text-primary font-medium">AI-powered</span> revenue sharing • 
                        <span className="text-accent font-medium ml-1">Real-time</span> attribution
                      </p>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <RevenueTracker />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card className="p-6 bg-editor-surface border-border">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  View detailed analytics on revenue sharing, creator engagement, and fair use metrics.
                </p>
              </div>
            </Card>
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

export default CreatorDashboard;