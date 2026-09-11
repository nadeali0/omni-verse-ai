'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Zap, FileText, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  { name: 'New Chat', icon: '💬', href: '/chat', color: 'from-blue-500/20' },
  { name: 'Generate Image', icon: '🖼️', href: '/image', color: 'from-purple-500/20' },
  { name: 'Create Video', icon: '🎬', href: '/video', color: 'from-pink-500/20' },
  { name: 'Avatar Pack', icon: '👤', href: '/avatar', color: 'from-green-500/20' },
  { name: 'Voice Studio', icon: '🎙️', href: '/voice', color: 'from-orange-500/20' },
  { name: 'Code Generator', icon: '💻', href: '/code', color: 'from-cyan-500/20' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalGenerations: 0,
    credits: 100,
    recentFiles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user stats from API
    setTimeout(() => {
      setStats({
        totalGenerations: 42,
        credits: 75,
        recentFiles: 12,
      });
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Welcome Back! 👋</h1>
          <p className="text-muted-foreground">Create amazing content with the power of AI</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Generations</p>
                <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.totalGenerations}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-primary/60" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credits Available</p>
                <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.credits}</p>
              </div>
              <Zap className="h-10 w-10 text-yellow-500/60" />
            </div>
            <div className="mt-4 w-full bg-muted rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all"
                style={{ width: `${(stats.credits / 100) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Files Uploaded</p>
                <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.recentFiles}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-500/60" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, idx) => (
              <Link key={action.href} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className={`group rounded-lg border border-border bg-gradient-to-br ${action.color} to-transparent p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center text-center`}
                >
                  <span className="text-4xl mb-3">{action.icon}</span>
                  <p className="font-semibold text-sm">{action.name}</p>
                  <ArrowRight className="h-4 w-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Generations</h2>
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No generations yet. Start creating!</p>
            <Link href="/chat">
              <Button className="gap-2">
                Create Your First Generation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Upgrade CTA */}
        {stats.credits < 50 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Low on Credits?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Upgrade to Pro or Unlimited to keep creating without limits. Get priority support and exclusive features.
            </p>
            <Link href="/settings">
              <Button size="lg" className="gap-2">
                View Pricing <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
