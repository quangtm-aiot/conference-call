import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1778643279648 implements MigrationInterface {
    name = 'CreateUsersTable1778643279648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_auth_provider_enum" AS ENUM('local', 'google')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('pending', 'active', 'suspended')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255), "first_name" character varying(100), "last_name" character varying(100), "avatar_url" character varying(255), "auth_provider" "public"."users_auth_provider_enum" NOT NULL DEFAULT 'local', "google_id" character varying(255), "email_verified" boolean NOT NULL DEFAULT false, "status" "public"."users_status_enum" NOT NULL DEFAULT 'active', "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_EMAIL_UNIQUE" ON "users" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_GOOGLE_ID_UNIQUE" ON "users" ("google_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_USERS_GOOGLE_ID_UNIQUE"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USERS_EMAIL_UNIQUE"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_auth_provider_enum"`);
    }

}
