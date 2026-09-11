# OMNI-VERSE AI - Development Guide

## Project Structure

```
omni-verse-ai/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── signin/
│   │   │   ├── signup/
│   │   │   └── error/
│   │   ├── api/
│   │   │   ├── generate/
│   │   │   ├── auth/
│   │   │   ├── payments/
│   │   │   └── health/
│   │   ├── page.tsx (Landing)
│   │   ├── dashboard/
│   │   ├── chat/
│   │   ├── image/
│   │   ├── video/
│   │   ├── avatar/
│   │   ├── voice/
│   │   ├── files/
│   │   ├── agents/
│   │   ├── code/
│   │   ├── marketplace/
│   │   ├── settings/
│   │   ├── admin/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── select.tsx
│   │   ├── navbar.tsx
│   │   ├── providers.tsx
│   │   └── auth-provider.tsx
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── omni-engine.ts
│   │   │   └── generate.ts
│   │   ├── db/
│   │   │   ├── user.ts
│   │   │   └── generation.ts
│   │   ├── validations/
│   │   │   ├── generate.ts
│   │   │   └── user.ts
│   │   ├── prisma.ts
│   │   ├── utils.ts
│   │   ├── stripe.ts
│   │   ├── rate-limit.ts
│   │   ├── auth.ts
│   │   └── middleware.ts
│   ├── styles/
│   │   └── globals.css
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── package.json
└── README.md
```

## Development Workflow

### 1. Setup
```bash
npm install
npm run db:push
npm run db:generate
npm run dev
```

### 2. Create New Page
```tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold">New Page</h1>
      </motion.div>
    </div>
  );
}
```

### 3. Add API Route
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { withRateLimit } from '@/lib/middleware';

export const POST = withRateLimit(
  withAuth(async (req: NextRequest, session) => {
    // Your logic here
    return NextResponse.json({ success: true });
  })
);
```

### 4. Call AI Models
```typescript
import { OmniEngine } from '@/lib/ai/omni-engine';

const engine = new OmniEngine();
const response = await engine.generateChat(
  'gpt-4o',
  'Hello, how are you?'
);
```

## Environment Variables

See `.env.local.example` for all required variables.

## Database Migrations

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Push schema
npm run db:push

# View database
npm run db:studio
```

## Performance Tips

1. **Image Optimization**: Use Next.js `<Image>` component
2. **Code Splitting**: Pages auto-split with App Router
3. **Caching**: Use React Query or SWR for data fetching
4. **Database**: Use Prisma select to fetch only needed fields
5. **API Routes**: Implement rate limiting for all endpoints

## Error Handling

All API routes use consistent error handling:
```typescript
try {
  // logic
} catch (error: any) {
  console.error('Error:', error);
  return NextResponse.json(
    { error: error.message || 'Internal error' },
    { status: 400 }
  );
}
```

## Testing

```bash
# Run linting
npm run lint

# Type check
npm run type-check

# Build check
npm run build
```

## Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Tests passing
- [ ] Build successful
- [ ] Type checking passes
- [ ] No console errors
- [ ] Rate limiting configured
- [ ] Error monitoring setup (Sentry)

## Troubleshooting

### Prisma Issues
```bash
npm run db:generate
npm run db:push
```

### Style Issues
- Clear .next cache: `rm -rf .next`
- Rebuild: `npm run build`

### API Issues
- Check environment variables
- Check database connection
- Review server logs

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test
3. Commit: `git commit -m "feat: your feature"`
4. Push: `git push origin feature/your-feature`
5. Create PR

---

**Happy coding! 🚀**
