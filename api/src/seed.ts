// Inserts 5 sample users. Safe to re-run: existing emails are updated, not duplicated.
import dataSource from './datasource';
import { User } from './app/modules/users/entities/user.entity';

const sampleUsers = [
  { name: 'Ada Lovelace', email: 'ada@example.com' },
  { name: 'Grace Hopper', email: 'grace@example.com' },
  { name: 'Alan Turing', email: 'alan@example.com' },
  { name: 'Katherine Johnson', email: 'katherine@example.com' },
  { name: 'Linus Torvalds', email: 'linus@example.com' },
];

async function seed() {
  await dataSource.initialize();
  await dataSource.getRepository(User).upsert(sampleUsers, ['email']);
  console.log(`Seeded ${sampleUsers.length} users`);
  await dataSource.destroy();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
