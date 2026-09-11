'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Activity } from 'lucide-react';

const adminStats = [
  { label: 'Total Users', value: '1,234', change: '+12%', icon: Users },
  { label: 'Total Revenue', value: '$45,320', change: '+28%', icon: TrendingUp },
  { label: 'Active Sessions', value: '342', change: '+5%', icon: Activity },
];

const userList = [
  { id: 1, email: 'user1@example.com', plan: 'PRO', credits: 850, joined: '2024-01-15' },
  { id: 2, email: 'user2@example.com', plan: 'FREE', credits: 45, joined: '2024-02-20' },
  { id: 3, email: 'user3@example.com', plan: 'UNLIMITED', credits: 'Unlimited', joined: '2024-01-05' },
  { id: 4, email: 'user4@example.com', plan: 'PRO', credits: 670, joined: '2024-02-10' },
  { id: 5, email: 'user5@example.com', plan: 'FREE', credits: 95, joined: '2024-03-01' },
];

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">👨‍💼 Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, revenue, and platform analytics</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {adminStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p className="text-xs text-green-500 mt-2">{stat.change} vs last month</p>
                  </div>
                  <Icon className="h-10 w-10 text-primary/60" />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Users</h2>
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Plan</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Credits</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {userList.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.plan === 'FREE'
                          ? 'bg-gray-500/20 text-gray-400'
                          : user.plan === 'PRO'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.credits}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="px-6 py-4 text-sm">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(user.id)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
