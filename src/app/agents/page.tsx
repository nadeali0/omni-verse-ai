'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, GitBranch } from 'lucide-react';

const prebuiltAgents = [
  { name: 'Research Agent', desc: 'Gather info from web and summarize', icon: '🔍' },
  { name: 'Social Media Agent', desc: 'Generate content for all platforms', icon: '📱' },
  { name: 'Coding Agent', desc: 'Generate and debug code', icon: '💻' },
  { name: 'Writing Agent', desc: 'Create blogs, emails, copies', icon: '✍️' },
  { name: 'Marketing Agent', desc: 'Analyze competitors and trends', icon: '📊' },
  { name: 'Customer Support Agent', desc: 'Answer customer queries', icon: '🎧' },
];

export default function Agents() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">🤖 AI Agents</h1>
          <p className="text-muted-foreground">No-Code Agent Builder with Drag & Drop</p>
        </motion.div>

        {/* Builder CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-lg border border-primary/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Create Custom Agent</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use React Flow to design your own AI agent with custom nodes and triggers.
          </p>
          <Button size="lg" className="gap-2">
            <GitBranch className="h-4 w-4" /> Open Agent Builder
          </Button>
        </motion.div>

        {/* Pre-built Agents */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mb-6">Pre-Built Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prebuiltAgents.map((agent, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <p className="text-4xl mb-3 group-hover:scale-110 transition-transform">{agent.icon}</p>
                <h3 className="font-semibold mb-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{agent.desc}</p>
                <Button size="sm" className="w-full">Deploy</Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
