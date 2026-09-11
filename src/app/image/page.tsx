'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ImageIcon, Wand2, Download, Zap } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

const models = [
  { id: 'sdxl', name: 'Stable Diffusion XL', type: 'Standard' },
  { id: 'flux', name: 'Flux Pro', type: 'Premium' },
  { id: 'sdxl-turbo', name: 'SDXL Turbo', type: 'Fast' },
];

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  timestamp: Date;
}

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('sdxl');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [numOutputs, setNumOutputs] = useState(1);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);

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
          type: 'image',
          model: selectedModel,
          prompt,
          imageModel: selectedModel,
          width,
          height,
          numOutputs,
          userId: 'test-user-id',
        }),
      });

      const data = await response.json();

      if (data.success) {
        const result = Array.isArray(data.result) ? data.result : [data.result];
        const newImages = result.map((url: string, idx: number) => ({
          id: Date.now().toString() + idx,
          url,
          prompt,
          model: selectedModel,
          timestamp: new Date(),
        }));
        setImages([...newImages, ...images]);
        toast.success(`Generated ${newImages.length} image(s)!`);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">🎨 Image Generation</h1>
          <p className="text-muted-foreground">Generate stunning images with AI</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              {/* Model Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3">Model</label>
                <div className="space-y-2">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                        selectedModel === model.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <p className="font-medium">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.type}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-semibold mb-3">Dimensions</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Width</p>
                    <select
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value={512}>512</option>
                      <option value={768}>768</option>
                      <option value={1024}>1024</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Height</p>
                    <select
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value={512}>512</option>
                      <option value={768}>768</option>
                      <option value={1024}>1024</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Number of Outputs */}
              <div>
                <label className="block text-sm font-semibold mb-3">Number of Images</label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={numOutputs}
                  onChange={(e) => setNumOutputs(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">{numOutputs} image(s)</p>
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-sm font-semibold mb-3">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full gap-2"
              >
                <Wand2 className="h-4 w-4" />
                {loading ? 'Generating...' : 'Generate Images'}
              </Button>
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {images.length === 0 ? (
              <div className="rounded-lg border border-border bg-card/50 p-12 text-center flex flex-col items-center justify-center min-h-96">
                <ImageIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-2">No images generated yet</p>
                <p className="text-sm text-muted-foreground">Enter a prompt and click generate to create your first image</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg border border-border overflow-hidden bg-card group"
                  >
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = image.url;
                            link.download = `image-${image.id}.png`;
                            link.click();
                          }}
                        >
                          <Download className="h-4 w-4" /> Download
                        </Button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground line-clamp-2">{image.prompt}</p>
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
