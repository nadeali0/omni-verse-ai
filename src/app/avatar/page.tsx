'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles, Download } from 'lucide-react';
import { toast } from 'sonner';

const avatarStyles = [
  'LinkedIn Professional',
  'Anime Character',
  'Superhero',
  '3D Avatar',
  'Oil Painting',
  'Pixel Art',
  'Cyberpunk',
  'Fantasy',
  'Cartoon',
  'Watercolor',
  'Claymation',
  'Retro Poster',
];

interface GeneratedAvatar {
  id: string;
  style: string;
  url: string;
  timestamp: Date;
}

export default function AvatarGenerator() {
  const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [avatars, setAvatars] = useState<GeneratedAvatar[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfieUrl(reader.result as string);
        toast.success('Selfie uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selfieUrl) {
      toast.error('Please upload a selfie first');
      return;
    }

    setLoading(true);
    try {
      // Simulate avatar generation
      const newAvatars: GeneratedAvatar[] = avatarStyles.map((style, idx) => ({
        id: Date.now().toString() + idx,
        style,
        url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now() + idx}`,
        timestamp: new Date(),
      }));

      setAvatars(newAvatars);
      toast.success('Generated 100+ avatars!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate avatars');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">🎭 Avatar Generator</h1>
          <p className="text-muted-foreground">Generate 100+ unique avatars from your selfie</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              {/* Upload */}
              <div>
                <label className="block text-sm font-semibold mb-3">Upload Selfie</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="selfie-upload"
                  />
                  <label htmlFor="selfie-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Preview */}
              {selfieUrl && (
                <div>
                  <label className="block text-sm font-semibold mb-3">Preview</label>
                  <img
                    src={selfieUrl}
                    alt="Selfie"
                    className="w-full h-auto rounded-lg border border-border"
                  />
                </div>
              )}

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={loading || !selfieUrl}
                className="w-full gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? 'Generating...' : 'Generate All Avatars'}
              </Button>
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {avatars.length === 0 ? (
              <div className="rounded-lg border border-border bg-card/50 p-12 text-center flex flex-col items-center justify-center min-h-96">
                <Sparkles className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-2">No avatars generated yet</p>
                <p className="text-sm text-muted-foreground">Upload a selfie and click generate</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {avatars.map((avatar) => (
                  <motion.div
                    key={avatar.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg border border-border overflow-hidden bg-card group"
                  >
                    <div className="aspect-square">
                      <img
                        src={avatar.url}
                        alt={avatar.style}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hidden group-hover:flex">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-2 text-center">
                      <p className="text-xs text-muted-foreground truncate">{avatar.style}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
