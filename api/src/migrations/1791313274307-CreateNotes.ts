import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotes1791313274307 implements MigrationInterface {
    name = 'CreateNotes1791313274307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`);
        await queryRunner.query(`DROP TABLE "notes"`);
    }

}
