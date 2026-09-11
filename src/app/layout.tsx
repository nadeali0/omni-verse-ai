import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'OMNI-VERSE AI - The Ultimate AI SaaS Platform',
  description: 'Generate with ChatGPT, Claude, Gemini, Image Generation, Video Creation, Voice Synthesis, and more. All in one place.',
  keywords: ['AI', 'SaaS', 'ChatGPT', 'Image Generation', 'Video Creation', 'Voice Synthesis'],
  openGraph: {
    title: 'OMNI-VERSE AI',
    description: 'The Ultimate AI SaaS Platform',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
