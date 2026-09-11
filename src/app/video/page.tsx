'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function VideoGeneration() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(8);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'video',
          model: 'zeroscope-v2-xl',
          prompt,
          duration,
          userId: 'test-user-id',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setVideoUrl(data.result);
        toast.success('Video generated successfully!');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">🎬 Video Generation</h1>
          <p className="text-muted-foreground">Generate videos from text descriptions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold mb-3">Duration (seconds)</label>
                <input
                  type="range"
                  min="4"
                  max="16"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">{duration}s</p>
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-sm font-semibold mb-3">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the video you want to create..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Generate Video
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {videoUrl ? (
              <div className="rounded-lg border border-border overflow-hidden bg-black">
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card/50 p-12 text-center flex flex-col items-center justify-center aspect-video">
                <Play className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Your generated video will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
