import { MigrationInterface, QueryRunner } from 'typeorm';

// Written by hand: migration:generate would DROP and re-ADD the column,
// which would reset every existing note's createdAt to now().
// The existing values were written by now() in a UTC session, so they are UTC.
export class NotesCreatedAtTimestamptz1791315600000 implements MigrationInterface {
  name = 'NotesCreatedAtTimestamptz1791315600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE USING "createdAt" AT TIME ZONE 'UTC'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" ALTER COLUMN "createdAt" TYPE TIMESTAMP USING "createdAt" AT TIME ZONE 'UTC'`,
    );
  }
}
