import { UserEntity } from "../entities/user.entity";
import { CreateUserPayload } from "./types/create-user.payload";

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(payload: CreateUserPayload): UserEntity;
  save(user: UserEntity): Promise<UserEntity>;
}
