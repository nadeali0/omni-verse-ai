'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles, Bot, Image, Video, Mic, FileText, Code, Shuffle, BarChart3, Shield, Zap as ZapIcon, Cpu, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  { icon: Bot, title: 'ChatGPT Clone', description: 'Chat with GPT-4o, Claude, Gemini & more' },
  { icon: Image, title: 'Image Generation', description: 'SDXL, Flux, and advanced inpainting' },
  { icon: Video, title: 'Video Creation', description: 'Text-to-video and image-to-video' },
  { icon: Sparkles, title: 'Avatar Generator', description: '100+ avatar styles from selfie' },
  { icon: Mic, title: 'Voice Synthesis', description: 'TTS with 100+ voices and cloning' },
  { icon: FileText, title: 'PDF Chat', description: 'Chat with your documents' },
  { icon: Code, title: 'Code Generator', description: 'Generate, debug & explain code' },
  { icon: Bot, title: 'No-Code Agents', description: 'Drag & drop agent builder' },
  { icon: Shuffle, title: 'Compare Mode', description: 'Side-by-side AI model comparison' },
  { icon: Cpu, title: 'Vision AI', description: 'Analyze images with AI' },
  { icon: Shield, title: 'Privacy First', description: 'Bring Your Own Keys (BYOK)' },
  { icon: GitBranch, title: 'Prompt Library', description: '2000+ community prompts' },
  { icon: BarChart3, title: 'Analytics', description: 'Track usage and credits' },
  { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed' },
  { icon: Sparkles, title: 'Always Updated', description: 'Latest AI models integrated' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    image: '👩‍💼',
    quote: 'OMNI-VERSE AI saved me hours every week. The multi-model comparison is game-changing.',
  },
  {
    name: 'Alex Rodriguez',
    role: 'Developer',
    image: '👨‍💻',
    quote: 'The code generation and debugging features are incredibly accurate. Best tool for devs.',
  },
  {
    name: 'Emma Thompson',
    role: 'Designer',
    image: '👩‍🎨',
    quote: 'Image generation quality is outstanding. I use it daily for design inspiration.',
  },
];

const faqs = [
  {
    q: 'What models are supported?',
    a: 'GPT-4o, Claude 3.5, Gemini 1.5, Llama 3.1, Mistral Large, SDXL, Flux and more.',
  },
  {
    q: 'Can I use my own API keys?',
    a: 'Yes! BYOK support lets you use your own keys for truly unlimited generation.',
  },
  {
    q: 'How do credits work?',
    a: 'Free tier gets 100 credits. Chat = 1 credit, Images = 5 credits, Video = 10 credits.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes, we never store your data. All processing is secure and encrypted.',
  },
];

const pricing = [
  {
    name: 'FREE',
    price: '$0',
    credits: '100',
    features: ['100 monthly credits', 'All AI models', 'Basic file uploads', 'Community prompts'],
  },
  {
    name: 'PRO',
    price: '$29',
    credits: '1000',
    features: ['1000 monthly credits', 'Priority support', 'Advanced file uploads', '2000+ prompts', 'No watermarks'],
  },
  {
    name: 'UNLIMITED',
    price: '$99',
    credits: '∞',
    features: ['Unlimited credits', '24/7 support', 'API access', 'Custom integrations', 'Team collaboration'],
  },
];

const logos = ['OpenAI', 'Anthropic', 'Google', 'Replicate', 'Stripe', 'Supabase'];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">OMNI-VERSE AI</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
            The Ultimate AI SaaS Platform. Chat, Create Images & Videos, Generate Code, and More.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Logos */}
      <section className="border-y border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-semibold text-muted-foreground mb-8">Powered by leading AI providers</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
            {logos.map((logo) => (
              <div key={logo} className="text-center text-sm font-semibold text-muted-foreground opacity-60 hover:opacity-100 transition-opacity">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">15 Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need in one platform</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <Icon className="h-8 w-8 mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-y border-border px-4 py-24 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Pay only for what you use</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-lg border p-8 transition-all ${
                  idx === 1
                    ? 'border-primary bg-primary/5 scale-105 shadow-lg'
                    : 'border-border bg-background'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm text-muted-foreground">{plan.credits} credits/month</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex gap-3">
                      <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={idx === 1 ? 'default' : 'outline'}>
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Creators & Developers</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-lg border border-border bg-card p-8"
              >
                <p className="text-lg mb-6 italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-y border-border px-4 py-24 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-lg border border-border bg-background p-6"
              >
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {faq.q}
                </h3>
                <p className="text-muted-foreground ml-6">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl rounded-lg border border-border bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Workflow?</h2>
          <p className="text-muted-foreground mb-8">Start for free. No credit card required.</p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Launch Now <ZapIcon className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Docs</a></li>
                <li><a href="#" className="hover:text-foreground transition">Guides</a></li>
                <li><a href="#" className="hover:text-foreground transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 OMNI-VERSE AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
