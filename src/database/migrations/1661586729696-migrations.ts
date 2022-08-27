import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1661586729696 implements MigrationInterface {
  name = 'migrations1661586729696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "owner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar, "ownerId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "role" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar, "ownerId" integer NOT NULL, CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "owner" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pet"("id", "name", "type", "ownerId") SELECT "id", "name", "type", "ownerId" FROM "pet"`,
    );
    await queryRunner.query(`DROP TABLE "pet"`);
    await queryRunner.query(`ALTER TABLE "temporary_pet" RENAME TO "pet"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pet" RENAME TO "temporary_pet"`);
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar, "ownerId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "pet"("id", "name", "type", "ownerId") SELECT "id", "name", "type", "ownerId" FROM "temporary_pet"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_pet"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "pet"`);
    await queryRunner.query(`DROP TABLE "owner"`);
  }
}
