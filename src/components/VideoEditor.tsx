import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Square, Upload, Download, Music, Video, Scissors } from "lucide-react";
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
  };
}

const VideoEditor = () => {
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
      name: "Main Content",
      type: "video",
      duration: 300,
      startTime: 0,
    },
    {
      id: "2", 
      name: "Music Clip - Shape of You",
      type: "copyrighted",
      duration: 30,
      startTime: 60,
      attribution: {
        title: "Shape of You",
        artist: "Ed Sheeran",
        owner: "Atlantic Records"
      }
    }
  ]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast(isPlaying ? "Playback paused" : "Playing video");
    
    // Simulate triggering attribution for copyrighted content
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
    toast("Upload your video clips or music files");
  };

  const handleExport = () => {
    toast("Exporting video with attribution overlays...");
  };

  return (
    <div className="min-h-screen bg-editor-bg text-foreground">
      {/* Header */}
      <header className="bg-editor-panel border-b border-border px-6 py-4 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ClipCreator Pro
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="w-4 h-4" />
              <span>Professional Video Editor</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleAddClip} className="gap-2">
              <Upload className="w-4 h-4" />
              Import Clips
            </Button>
            <Button onClick={handleExport} className="gap-2 bg-gradient-primary hover:opacity-90">
              <Download className="w-4 h-4" />
              Export Video
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Clip Library */}
        <aside className="w-80 bg-editor-panel border-r border-border p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-primary" />
            Clip Library
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
          <div className="flex-1 bg-editor-bg p-6">
            <Card className="h-full bg-editor-surface border-border flex items-center justify-center">
              <div className="text-center">
                <div className="w-96 h-56 bg-timeline-bg rounded-lg mb-6 flex items-center justify-center border border-border">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Video Preview</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Import clips to start editing
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

          {/* Timeline */}
          <div className="h-64 bg-timeline-bg border-t border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Timeline</h3>
              <div className="text-sm text-muted-foreground">
                {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 5:00
              </div>
            </div>
            
            {/* Timeline Track */}
            <div className="relative h-20 bg-timeline-track rounded-lg border border-border overflow-hidden">
              {/* Playhead */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-timeline-playhead z-10 animate-pulse-primary"
                style={{ left: `${(currentTime / 300) * 100}%` }}
              />
              
              {/* Clips on timeline */}
              {clips.map((clip) => (
                <div
                  key={clip.id}
                  className={`absolute top-2 bottom-2 rounded border-2 ${
                    clip.type === "copyrighted" 
                      ? "bg-accent/20 border-accent" 
                      : "bg-primary/20 border-primary"
                  } flex items-center px-3`}
                  style={{
                    left: `${(clip.startTime / 300) * 100}%`,
                    width: `${(clip.duration / 300) * 100}%`
                  }}
                >
                  <span className="text-xs font-medium truncate">
                    {clip.name}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Drag clips from the library to add them to your timeline
              </p>
            </div>
          </div>
        </main>
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

export default VideoEditor;