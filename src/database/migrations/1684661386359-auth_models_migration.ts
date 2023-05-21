import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthModelsMigration1684661386359 implements MigrationInterface {
    name = 'AuthModelsMigration1684661386359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "device_info" character varying NOT NULL, "ip_address" character varying NOT NULL, "token" character varying NOT NULL, "profileId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying, "moodle_consent" boolean NOT NULL DEFAULT false, "profileId" integer, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "email" character varying, "country" character varying, "city" character varying, "status" character varying, "study_group" character varying, "study_direction" character varying, "profile" character varying, "patronymic" character varying, "avatar" character varying, "profile_type" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions_role_permission" ("roleId" integer NOT NULL, "rolePermissionId" integer NOT NULL, CONSTRAINT "PK_9ae6463f1fb151caec693f2a629" PRIMARY KEY ("roleId", "rolePermissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e51f7812c922958953fa618895" ON "role_permissions_role_permission" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf0d8ef383c720e379e19b8daf" ON "role_permissions_role_permission" ("rolePermissionId") `);
        await queryRunner.query(`CREATE TABLE "profile_roles_role" ("profileId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_a826ed81b08b1098664ae362be4" PRIMARY KEY ("profileId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d3b61c78aded59b6c17379a870" ON "profile_roles_role" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd0569853dcd30da08ca097d6f" ON "profile_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions_role_permission" ADD CONSTRAINT "FK_e51f7812c922958953fa6188957" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions_role_permission" ADD CONSTRAINT "FK_bf0d8ef383c720e379e19b8daf7" FOREIGN KEY ("rolePermissionId") REFERENCES "role_permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile_roles_role" ADD CONSTRAINT "FK_d3b61c78aded59b6c17379a870b" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_roles_role" ADD CONSTRAINT "FK_cd0569853dcd30da08ca097d6f7" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_roles_role" DROP CONSTRAINT "FK_cd0569853dcd30da08ca097d6f7"`);
        await queryRunner.query(`ALTER TABLE "profile_roles_role" DROP CONSTRAINT "FK_d3b61c78aded59b6c17379a870b"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_role_permission" DROP CONSTRAINT "FK_bf0d8ef383c720e379e19b8daf7"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_role_permission" DROP CONSTRAINT "FK_e51f7812c922958953fa6188957"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd0569853dcd30da08ca097d6f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3b61c78aded59b6c17379a870"`);
        await queryRunner.query(`DROP TABLE "profile_roles_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf0d8ef383c720e379e19b8daf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e51f7812c922958953fa618895"`);
        await queryRunner.query(`DROP TABLE "role_permissions_role_permission"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
