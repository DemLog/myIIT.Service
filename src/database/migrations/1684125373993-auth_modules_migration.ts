import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthModulesMigration1684125373993 implements MigrationInterface {
    name = 'AuthModulesMigration1684125373993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "device_info" character varying NOT NULL, "ip_address" character varying NOT NULL, "token" character varying NOT NULL, "profileId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying, "moodle_consent" boolean NOT NULL DEFAULT false, "profile_id" integer, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "email" character varying, "country" character varying, "city" character varying, "status" character varying, "study_group" character varying, "study_direction" character varying, "profile" character varying, "patronymic" character varying, "avatar" character varying, "profile_type" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_profile" ("roleId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_27f6ca21dc2ee1984bd3cfdb7e4" PRIMARY KEY ("roleId", "profileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0a6b2088c111568eb5939ecd4f" ON "role_profile" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e401b3343bade0ddda654a03be" ON "role_profile" ("profileId") `);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_96c8f1fd25538d3692024115b47"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "rolePermissionId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_96c8f1fd25538d3692024115b47"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_dbdeead61a3592df388ca08ceae" PRIMARY KEY ("id", "rolePermissionId")`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "roleId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_dbdeead61a3592df388ca08ceae"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_c39eb1961c0ef36b2b8f8c78589" PRIMARY KEY ("id", "rolePermissionId", "roleId")`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_c39eb1961c0ef36b2b8f8c78589"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_a21afedbca8624fe48be4374270" PRIMARY KEY ("rolePermissionId", "roleId")`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_c39eb1961c0ef36b2b8f8c78589"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_a21afedbca8624fe48be4374270" PRIMARY KEY ("roleId", "rolePermissionId")`);
        await queryRunner.query(`CREATE INDEX "IDX_4f6a0c2c1f39ff29564d33b866" ON "role_permission" ("rolePermissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON "role_permission" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_4f6a0c2c1f39ff29564d33b8662" FOREIGN KEY ("rolePermissionId") REFERENCES "role_permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_profile" ADD CONSTRAINT "FK_0a6b2088c111568eb5939ecd4f0" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_profile" ADD CONSTRAINT "FK_e401b3343bade0ddda654a03be9" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_profile" DROP CONSTRAINT "FK_e401b3343bade0ddda654a03be9"`);
        await queryRunner.query(`ALTER TABLE "role_profile" DROP CONSTRAINT "FK_0a6b2088c111568eb5939ecd4f0"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_4f6a0c2c1f39ff29564d33b8662"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3130a39c1e4a740d044e68573"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f6a0c2c1f39ff29564d33b866"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_a21afedbca8624fe48be4374270"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_c39eb1961c0ef36b2b8f8c78589" PRIMARY KEY ("id", "rolePermissionId", "roleId")`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_a21afedbca8624fe48be4374270"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_c39eb1961c0ef36b2b8f8c78589" PRIMARY KEY ("id", "rolePermissionId", "roleId")`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_c39eb1961c0ef36b2b8f8c78589"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_dbdeead61a3592df388ca08ceae" PRIMARY KEY ("id", "rolePermissionId")`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_dbdeead61a3592df388ca08ceae"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "rolePermissionId"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "PK_96c8f1fd25538d3692024115b47"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e401b3343bade0ddda654a03be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a6b2088c111568eb5939ecd4f"`);
        await queryRunner.query(`DROP TABLE "role_profile"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
