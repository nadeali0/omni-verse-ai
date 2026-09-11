'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code2, Bug, Lightbulb, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const languages = ['JavaScript', 'Python', 'TypeScript', 'Java', 'Go', 'Rust', 'C++'];

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [mode, setMode] = useState<'generate' | 'debug' | 'explain'>('generate');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
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
          type: 'code',
          model: 'gpt-4o',
          prompt: `${mode.toUpperCase()}: ${prompt}`,
          userId: 'test-user-id',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCode(data.result);
        toast.success('Done!');
      }
    } catch (error) {
      toast.error('Failed to process');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">💻 Code Generator</h1>
          <p className="text-muted-foreground">Generate, Debug & Explain Code</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="rounded-lg border border-border bg-card p-6 space-y-6 sticky top-20">
              {/* Mode Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3">Mode</label>
                <div className="space-y-2">
                  {[
                    { id: 'generate', name: 'Generate', icon: Code2 },
                    { id: 'debug', name: 'Debug', icon: Bug },
                    { id: 'explain', name: 'Explain', icon: Lightbulb },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMode(m.id as any)}
                        className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                          mode === m.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className="h-4 w-4" /> {m.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold mb-3">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-sm font-semibold mb-3">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you need..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Button */}
              <Button
                onClick={handleProcess}
                disabled={loading}
                className="w-full gap-2"
              >
                <Code2 className="h-4 w-4" />
                {loading ? 'Processing...' : 'Process'}
              </Button>
            </div>
          </motion.div>

          {/* Code Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {code ? (
              <div className="rounded-lg border border-border bg-slate-900 text-slate-100 p-6 font-mono text-sm overflow-x-auto">
                <pre>{code}</pre>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card/50 p-12 text-center flex flex-col items-center justify-center min-h-96">
                <Code2 className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Code output will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
