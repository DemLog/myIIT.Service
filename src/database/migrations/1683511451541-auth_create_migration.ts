import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthCreateMigration1683511451541 implements MigrationInterface {
    name = 'AuthCreateMigration1683511451541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "device_info" character varying NOT NULL, "ip_address" character varying NOT NULL, "token" character varying NOT NULL, "profileId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying, "moodle_consent" boolean NOT NULL DEFAULT false, "profile_id" integer, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "email" character varying, "country" character varying, "city" character varying, "status" character varying, "study_group" character varying, "study_direction" character varying, "profile" character varying, "patronymic" character varying, "avatar" character varying, "profile_type" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
