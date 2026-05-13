import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserAuthProvider, UserStatus } from "@repo/shared-types";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index("IDX_USERS_EMAIL_UNIQUE", { unique: true })
  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true, select: false })
  password!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, name: "first_name" })
  firstName!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, name: "last_name" })
  lastName!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true, name: "avatar_url" })
  avatarUrl!: string | null;

  @Column({
    type: "enum",
    enum: UserAuthProvider,
    default: UserAuthProvider.LOCAL,
    name: "auth_provider",
  })
  authProvider!: UserAuthProvider;

  @Index("IDX_USERS_GOOGLE_ID_UNIQUE", { unique: true })
  @Column({ type: "varchar", length: 255, nullable: true, name: "google_id" })
  googleId!: string | null;

  @Column({ type: "boolean", default: false, name: "email_verified" })
  emailVerified!: boolean;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
    name: "status",
  })
  status!: UserStatus;

  @Column({ type: "timestamp with time zone", nullable: true, name: "last_login_at" })
  lastLoginAt!: Date | null;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail(): void {
    this.email = this.email.trim().toLowerCase();
  }
}
