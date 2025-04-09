import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

/**
 * Seed the database with universities.
 *
 * This is a one-time script to populate the database with universities.
 * It is not meant to be run again. If it is, it will check if the universities
 * already exist (by name) and skip creating them.
 *
 * This script is meant to be run with `pnpm db:seed` or `pnpm prisma db seed`.
 *
 * Universities are taken from the `universities.txt` file. The file can be found
 * in the `prisma` directory. The file is a list of university names, one per line.
 * Comments (marked with a `#`) are allowed and will be ignored.
 *
 * @see https://www.hochschulkompass.de/hochschulen/downloads.html
 */
async function main() {
  const filePath = join(__dirname, 'universities.txt');
  const universities = readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  for (const name of universities) {
    // leave out comments
    if (name.startsWith('#')) {
      continue;
    }

    const count = await prisma.university.count({
      where: {
        name,
      },
    });

    if (count === 0) {
      await prisma.university.create({
        data: {
          name,
        },
      });
      console.log(`Created university "${name}".`);
    } else {
      console.log(`University "${name}" already exists, skipping.`);
    }
  }

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
