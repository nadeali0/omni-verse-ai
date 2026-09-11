'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, Mic, Music, Loader } from 'lucide-react';
import { toast } from 'sonner';

const voices = [
  { id: 'en_us_male_1', name: 'Marcus', type: 'Male' },
  { id: 'en_us_female_1', name: 'Emma', type: 'Female' },
  { id: 'en_us_male_2', name: 'James', type: 'Male' },
  { id: 'en_us_female_2', name: 'Sarah', type: 'Female' },
  { id: 'en_gb_male_1', name: 'Oliver', type: 'Male (British)' },
  { id: 'en_gb_female_1', name: 'Charlotte', type: 'Female (British)' },
];

export default function VoiceGeneration() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('en_us_male_1');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [tab, setTab] = useState<'tts' | 'clone'>('tts');

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast.error('Please enter text');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call ElevenLabs API
      // Simulating audio generation
      setTimeout(() => {
        setAudioUrl('https://example.com/audio.mp3');
        toast.success('Audio generated successfully!');
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate speech');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">🎙️ Voice Studio</h1>
          <p className="text-muted-foreground">Text-to-Speech, Voice Cloning & Music Generation</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mt-8 border-b border-border">
          <button
            onClick={() => setTab('tts')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              tab === 'tts'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Volume2 className="inline h-4 w-4 mr-2" /> Text-to-Speech
          </button>
          <button
            onClick={() => setTab('clone')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              tab === 'clone'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mic className="inline h-4 w-4 mr-2" /> Voice Cloning
          </button>
        </div>

        {/* TTS Section */}
        {tab === 'tts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                {/* Voice Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Voice</label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    {voices.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Text Input */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Text</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to convert to speech..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateSpeech}
                  disabled={loading}
                  className="w-full gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" /> Generate Speech
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Player */}
            <div className="lg:col-span-2">
              {audioUrl ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg border border-border bg-card p-8"
                >
                  <h3 className="font-semibold mb-4">Generated Audio</h3>
                  <audio
                    src={audioUrl}
                    controls
                    autoPlay
                    className="w-full mb-4"
                  />
                  <Button className="w-full gap-2" variant="outline">
                    ⬇️ Download Audio
                  </Button>
                </motion.div>
              ) : (
                <div className="rounded-lg border border-border bg-card/50 p-12 text-center flex flex-col items-center justify-center min-h-96">
                  <Volume2 className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Generated audio will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Voice Cloning Section */}
        {tab === 'clone' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-lg border border-border bg-card p-8 text-center"
          >
            <Mic className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Voice Cloning</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Upload a 1-minute sample of your voice to create a custom voice model for unlimited TTS.
            </p>
            <div className="inline-flex gap-4">
              <Button>📤 Upload Voice Sample</Button>
              <Button variant="outline">📖 Learn More</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
