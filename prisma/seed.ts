import { PrismaClient } from "@prisma/client";
import dataForTesting from "./seed/data_for_testing.json";
import type { AdminSeedData} from "./seed/seed_admins";
import { seedAdmins } from "./seed/seed_admins";
import type { EventSeedData} from "./seed/seed_events";
import { seedEvents } from "./seed/seed_events";

interface SeedData {
  admins: AdminSeedData[];
  events: EventSeedData[];
}

const prisma = new PrismaClient();

async function seedData(data: SeedData) {
  const { admins, events } = data;
  await seedAdmins(prisma, admins);
  await seedEvents(prisma, events);
}

async function seed(option: string) {
  if (option === "for-testing") {
    // assumes an empty database
    await seedData(dataForTesting as SeedData);
    console.log(`Database has been seeded for testing. 🌱`);
    return;
  }

  console.log(`There is no default seeding setup at the moment.\nThe database was left unchanged by seed command 🌱`);
}

seed(process.argv[2])
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });