'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, Key, Zap, CreditCard, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const subscriptionPlans = [
  { name: 'FREE', price: '$0', credits: '100', color: 'from-blue-500' },
  { name: 'PRO', price: '$29', credits: '1000', color: 'from-purple-500' },
  { name: 'UNLIMITED', price: '$99', credits: '∞', color: 'from-pink-500' },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<'profile' | 'billing' | 'keys'>('profile');
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    google: '',
    replicate: '',
  });
  const [copied, setCopied] = useState<string | null>(null);

  const handleKeyCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
    toast.success('Copied!');
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">⚙️ Settings</h1>
          <p className="text-muted-foreground">Manage your account and API keys</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mt-8 border-b border-border">
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'billing', label: 'Billing' },
            { id: 'keys', label: 'API Keys (BYOK)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl"
          >
            <div className="rounded-lg border border-border bg-card p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="user@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Avatar</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <p className="text-sm">📤 Upload new avatar</p>
                </div>
              </div>
              <Button className="w-full">Save Changes</Button>
            </div>
          </motion.div>
        )}

        {/* Billing Tab */}
        {tab === 'billing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Current Plan</h2>
              <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 p-8">
                <p className="text-muted-foreground mb-2">Active Subscription</p>
                <p className="text-3xl font-bold mb-4">FREE Plan</p>
                <p className="text-muted-foreground mb-6">100 credits/month • Expires: 2025-01-01</p>
                <Button className="gap-2">
                  <CreditCard className="h-4 w-4" /> Upgrade Plan
                </Button>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border p-6 bg-gradient-to-br ${
                    plan.name === 'PRO'
                      ? `${plan.color}/20 border-primary`
                      : 'border-border'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold mb-4">{plan.price}</p>
                  <p className="text-muted-foreground mb-6">{plan.credits} credits/mo</p>
                  <Button className="w-full" variant={plan.name === 'PRO' ? 'default' : 'outline'}>
                    Upgrade
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* API Keys Tab */}
        {tab === 'keys' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl"
          >
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 mb-8">
              <p className="text-sm text-foreground">
                ✨ Bring Your Own Keys (BYOK) - Use your own API keys for unlimited generations!
              </p>
            </div>

            <div className="space-y-6">
              {[
                { key: 'openai', label: 'OpenAI API Key', placeholder: 'sk-...' },
                { key: 'anthropic', label: 'Anthropic API Key', placeholder: 'sk-ant-...' },
                { key: 'google', label: 'Google AI API Key', placeholder: 'AIza...' },
                { key: 'replicate', label: 'Replicate API Token', placeholder: 'r8_...' },
              ].map((item) => (
                <div key={item.key} className="rounded-lg border border-border bg-card p-6">
                  <label className="block text-sm font-semibold mb-3">{item.label}</label>
                  <div className="flex gap-3">
                    <input
                      type="password"
                      placeholder={item.placeholder}
                      value={(apiKeys as any)[item.key]}
                      onChange={(e) =>
                        setApiKeys({ ...apiKeys, [item.key]: e.target.value })
                      }
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleKeyCopy(item.key, (apiKeys as any)[item.key])
                      }
                    >
                      {copied === item.key ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-8">Save API Keys</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
