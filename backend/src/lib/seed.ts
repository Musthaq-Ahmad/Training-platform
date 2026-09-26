import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../config/env';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const trainees = [
  { email: 'aswin.vijayan@vonnue.com', name: 'Aswin Vijayan' },
  { email: 'hawas.backer@vonnue.com', name: 'Hawas Backer' },
  { email: 'fathima.fadwah@vonnue.com', name: 'Fathima Fadwah' },
  { email: 'ameesha.t@vonnue.com', name: 'Ameesha T' },
];

async function main() {
  console.log('Seeding trainees...');

  for (const trainee of trainees) {
    const result = await prisma.trainee.upsert({
      where: { email: trainee.email },
      update: { name: trainee.name },
      create: trainee,
    });
    console.log(`Upserted trainee: ${result.email}`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
