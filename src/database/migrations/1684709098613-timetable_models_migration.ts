import { MigrationInterface, QueryRunner } from "typeorm";

export class TimetableModelsMigration1684709098613 implements MigrationInterface {
    name = 'TimetableModelsMigration1684709098613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lecturer" ("id" SERIAL NOT NULL, "last_name" character varying NOT NULL, "first_name" character varying, "patronymic" character varying, "position" character varying, "contact" character varying, CONSTRAINT "PK_e9647bfd5a4c128c9cc3e8cf99c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'Неизвестно', CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_schedule" ("id" SERIAL NOT NULL, "number" integer, "start_time" character varying, "end_time" character varying, CONSTRAINT "PK_96047d7263938075fa9e335309d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson_schedule" ("id" SERIAL NOT NULL, "is_even_week" boolean NOT NULL DEFAULT false, "cabinet" character varying, "day_week" character varying NOT NULL DEFAULT 'Понедельник', "subjectId" integer, "timeId" integer, CONSTRAINT "PK_6cbb33c9c0b6936d58035cd2dba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson_schedule_groups_role" ("lessonScheduleId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_5534a09681f98ab87ee5e946b95" PRIMARY KEY ("lessonScheduleId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a31a91024d55d10764000863d" ON "lesson_schedule_groups_role" ("lessonScheduleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5bfcf47bde742c5f2eac830567" ON "lesson_schedule_groups_role" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "lesson_schedule_lecture_lecturer" ("lessonScheduleId" integer NOT NULL, "lecturerId" integer NOT NULL, CONSTRAINT "PK_e625359602f372b551ad4690ce0" PRIMARY KEY ("lessonScheduleId", "lecturerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_234df1e6fe4319dfa697b371a4" ON "lesson_schedule_lecture_lecturer" ("lessonScheduleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac2a524f261cc0611eaeb7923d" ON "lesson_schedule_lecture_lecturer" ("lecturerId") `);
        await queryRunner.query(`ALTER TABLE "lesson_schedule" ADD CONSTRAINT "FK_cf77ebed182aa8f28e85be29075" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule" ADD CONSTRAINT "FK_d43754728b174a2de0fde74a76f" FOREIGN KEY ("timeId") REFERENCES "time_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule_groups_role" ADD CONSTRAINT "FK_8a31a91024d55d10764000863d5" FOREIGN KEY ("lessonScheduleId") REFERENCES "lesson_schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule_groups_role" ADD CONSTRAINT "FK_5bfcf47bde742c5f2eac8305674" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule_lecture_lecturer" ADD CONSTRAINT "FK_234df1e6fe4319dfa697b371a41" FOREIGN KEY ("lessonScheduleId") REFERENCES "lesson_schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule_lecture_lecturer" ADD CONSTRAINT "FK_ac2a524f261cc0611eaeb7923dd" FOREIGN KEY ("lecturerId") REFERENCES "lecturer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_schedule_lecture_lecturer" DROP CONSTRAINT "FK_ac2a524f261cc0611eaeb7923dd"`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule_lecture_lecturer" DROP CONSTRAINT "FK_234df1e6fe4319dfa697b371a41"`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule_groups_role" DROP CONSTRAINT "FK_5bfcf47bde742c5f2eac8305674"`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule_groups_role" DROP CONSTRAINT "FK_8a31a91024d55d10764000863d5"`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule" DROP CONSTRAINT "FK_d43754728b174a2de0fde74a76f"`);
        await queryRunner.query(`ALTER TABLE "lesson_schedule" DROP CONSTRAINT "FK_cf77ebed182aa8f28e85be29075"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac2a524f261cc0611eaeb7923d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_234df1e6fe4319dfa697b371a4"`);
        await queryRunner.query(`DROP TABLE "lesson_schedule_lecture_lecturer"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bfcf47bde742c5f2eac830567"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a31a91024d55d10764000863d"`);
        await queryRunner.query(`DROP TABLE "lesson_schedule_groups_role"`);
        await queryRunner.query(`DROP TABLE "lesson_schedule"`);
        await queryRunner.query(`DROP TABLE "time_schedule"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "lecturer"`);
    }

}
