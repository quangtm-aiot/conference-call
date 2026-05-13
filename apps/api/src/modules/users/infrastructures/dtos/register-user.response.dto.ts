import { UserAuthProvider, UserStatus } from "@repo/shared-types";

import { UserEntity } from "../../domains/entities/user.entity";

export class RegisterUserResponseDto {
  id!: string;
  email!: string;
  firstName!: string | null;
  lastName!: string | null;
  avatarUrl!: string | null;
  authProvider!: UserAuthProvider;
  emailVerified!: boolean;
  status!: UserStatus;
  createdAt!: Date;
  updatedAt!: Date;

  static fromEntity(user: UserEntity): RegisterUserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      authProvider: user.authProvider,
      emailVerified: user.emailVerified,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
