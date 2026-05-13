import { UserEntity } from "../../entities/user.entity";

export interface CreateUserPayload {
  email: string;
  password: string | null;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  authProvider: UserEntity["authProvider"];
  googleId?: string | null;
  emailVerified: boolean;
  status: UserEntity["status"];
  lastLoginAt?: Date | null;
}
