// Inserts 5 sample users. Safe to re-run: existing emails are updated, not duplicated.
import dataSource from './datasource';
import { User, UserType } from './app/modules/users/entities/user.entity';

const sampleUsers = [
  { name: 'Ada Lovelace', email: 'ada@example.com', type: UserType.Patient },
  { name: 'Grace Hopper', email: 'grace@example.com', type: UserType.Physician },
  { name: 'Alan Turing', email: 'alan@example.com', type: UserType.Patient },
  { name: 'Katherine Johnson', email: 'katherine@example.com', type: UserType.Advocate },
  { name: 'Linus Torvalds', email: 'linus@example.com', type: UserType.Internal },
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
