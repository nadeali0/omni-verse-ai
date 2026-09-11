'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Star, Download } from 'lucide-react';

const samplePrompts = [
  {
    title: 'Dream Landscape',
    desc: 'A breathtaking landscape with floating islands',
    author: 'John Doe',
    likes: 1250,
    image: '🏝️',
  },
  {
    title: 'Cyberpunk City',
    desc: 'Neon-lit futuristic city with flying cars',
    author: 'Jane Smith',
    likes: 2100,
    image: '🌆',
  },
  {
    title: 'Magical Forest',
    desc: 'Enchanted forest with glowing mushrooms and fireflies',
    author: 'Alex Chen',
    likes: 1890,
    image: '🌲',
  },
  {
    title: 'Ocean Sunset',
    desc: 'Golden hour over calm ocean waters',
    author: 'Maria Garcia',
    likes: 2340,
    image: '🌅',
  },
  {
    title: 'Space Station',
    desc: 'Futuristic space station orbiting Earth',
    author: 'Tom Wilson',
    likes: 1670,
    image: '🚀',
  },
  {
    title: 'Fantasy Dragon',
    desc: 'Majestic dragon flying through storm clouds',
    author: 'Lisa Anderson',
    likes: 2050,
    image: '🐉',
  },
];

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [view, setView] = useState<'prompts' | 'feed'>('prompts');

  const filteredPrompts = samplePrompts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">🎨 Marketplace</h1>
          <p className="text-muted-foreground">2000+ Prompts & Community Feed</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 2000+ prompts..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setView('prompts')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              view === 'prompts'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Prompt Library
          </button>
          <button
            onClick={() => setView('feed')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              view === 'feed'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Public Feed
          </button>
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPrompts.map((prompt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {prompt.image}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{prompt.title}</h3>
                  <p className="text-sm text-muted-foreground">{prompt.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>By {prompt.author}</span>
                  </div>
                  <button
                    onClick={() =>
                      setFavorites(
                        favorites.includes(prompt.title)
                          ? favorites.filter((f) => f !== prompt.title)
                          : [...favorites, prompt.title]
                      )
                    }
                    className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        favorites.includes(prompt.title)
                          ? 'fill-primary text-primary'
                          : ''
                      }`}
                    />
                    {prompt.likes}
                  </button>
                </div>
                <Button size="sm" className="w-full gap-2">
                  <Download className="h-3 w-3" /> Use Prompt
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
