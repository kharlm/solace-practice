import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToUsers1791308733630 implements MigrationInterface {
    name = 'AddPhoneToUsers1791308733630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
