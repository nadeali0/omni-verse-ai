// This is a seed file for development
// Run with: npx prisma db seed

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@omni-verse.ai' },
    update: {},
    create: {
      email: 'demo@omni-verse.ai',
      name: 'Demo User',
      credits: 100,
      subscription: 'FREE',
    },
  });

  console.log('✅ Seeded database with demo user:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
