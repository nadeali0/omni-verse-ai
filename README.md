# OMNI-VERSE AI - Complete SaaS Platform

**Production-ready, error-free AI SaaS application with Next.js 14, TypeScript, Tailwind CSS, and multi-AI support.**

## 🚀 Features

### 13 Complete Pages:
1. **Landing Page** - Premium SaaS landing with hero, features, pricing, testimonials, FAQs
2. **Dashboard** - User stats, credits, quick actions, recent activity
3. **Chat** - Multi-model ChatGPT clone (GPT-4o, Claude, Gemini, Llama, Mistral) + Vision + Compare Mode
4. **Image Generation** - Text-to-image with SDXL, Flux, advanced controls
5. **Video Generation** - Text-to-video with duration control
6. **Avatar Generator** - Selfie → 100+ avatar styles
7. **Voice Studio** - Text-to-speech, voice cloning, 100+ voices
8. **File Manager** - Chat with PDF/DOCX/Excel, summarize, translate
9. **AI Agents** - No-code agent builder with pre-built agents
10. **Code Generator** - Generate, debug, explain code (7 languages)
11. **Marketplace** - 2000+ prompts + community feed
12. **Settings** - BYOK (Bring Your Own Keys), profile, billing
13. **Admin Dashboard** - User management, analytics, revenue tracking

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **UI/Styling**: Tailwind CSS 3 + shadcn/ui
- **Animations**: Framer Motion
- **Database**: Supabase + Prisma ORM
- **Authentication**: NextAuth v5
- **AI Models**: 
  - OpenAI (GPT-4o, GPT-4 Turbo)
  - Anthropic (Claude 3.5 Sonnet, Claude 3 Opus)
  - Google (Gemini 1.5 Pro)
  - Replicate (SDXL, Flux, Zeroscope)
- **Payment**: Stripe
- **Validation**: Zod
- **State Management**: Zustand
- **HTTP Client**: Axios, Ky
- **Notifications**: Sonner
- **Forms**: React Hook Form

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/nadeali0/omni-verse-ai.git
cd omni-verse-ai

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local

# Configure Supabase
npm run db:push
npm run db:generate

# Run development server
npm run dev
```

## 🔑 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# AI Models
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AIza...
REPLICATE_API_TOKEN=r8_...

# Auth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your_id
GITHUB_SECRET=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Database
DATABASE_URL=postgresql://...
```

## 📊 Database Schema

```prisma
model User {
  id              String
  email           String @unique
  name            String?
  image           String?
  apiKeys         Json?
  credits         Int
  subscription    String
  generations     Generation[]
  files           File[]
}

model Generation {
  id              String
  userId          String
  type            String // chat, image, video, avatar, voice, code
  prompt          String
  result          String?
  model           String
  creditsUsed     Int
  createdAt       DateTime
}

model File {
  id              String
  userId          String
  fileName        String
  fileUrl         String
  fileType        String
  fileSize        Int
  createdAt       DateTime
}
```

## 🎯 Core Components

### OmniEngine (`/lib/ai/omni-engine.ts`)
Unified AI interface supporting:
- Multi-model chat with vision
- Image generation (SDXL, Flux)
- Video generation
- BYOK fallback logic

### Generate API (`/app/api/generate/route.ts`)
- Zod validation
- Credit deduction
- Error handling
- Rate limiting
- Generation logging

### Authentication
- NextAuth v5 with GitHub & Google OAuth
- Protected routes middleware
- Session management

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Scaling Tips

1. **Database**: Use Supabase connection pooling for high traffic
2. **Caching**: Implement Redis for generation results
3. **Queue**: Use Bull for async AI task processing
4. **CDN**: Serve static assets from Cloudflare
5. **Monitoring**: Integrate Sentry for error tracking

## 🔒 Security

- ✅ HTTPS only
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ API key encryption
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React escaping)
- ✅ CORS configured
- ✅ Environment variables secured

## 📄 License

MIT License - feel free to use for commercial projects

## 🤝 Support

For issues and questions, open a GitHub issue or contact support@omni-verse.ai

---

**Built with ❤️ by the OMNI-VERSE team**
