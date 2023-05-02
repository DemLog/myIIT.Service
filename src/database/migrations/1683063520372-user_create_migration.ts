import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreateMigration1683063520372 implements MigrationInterface {
    name = 'UserCreateMigration1683063520372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "moodle_consent" boolean NOT NULL DEFAULT false, "profile_id" integer, CONSTRAINT "UQ_952e252e7470ff78b18a9ec786d" UNIQUE ("login"), CONSTRAINT "REL_4339c2a4f958dfe3b3b38eb09d" UNIQUE ("profile_id"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "status" character varying NOT NULL, "study_group" character varying NOT NULL, "study_direction" character varying NOT NULL, "profile" character varying NOT NULL, "patronymic" character varying NOT NULL, "avatar" character varying NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_4339c2a4f958dfe3b3b38eb09d9" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_4339c2a4f958dfe3b3b38eb09d9"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
