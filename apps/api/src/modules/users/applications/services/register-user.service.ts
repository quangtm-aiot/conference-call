import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserAuthProvider, UserStatus } from "@repo/shared-types";
import { hash } from "bcryptjs";

import { UserEntity } from "../../domains/entities/user.entity";
import { USER_REPOSITORY } from "../../domains/repositories/tokens/user-repository.token";
import { UserRepository } from "../../domains/repositories/user.repository";
import { RegisterUserCommand } from "../commands/register-user.command";

@Injectable()
export class RegisterUserService {
  private readonly PASSWORD_SALT_ROUNDS = 10;

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: RegisterUserCommand): Promise<UserEntity> {
    const normalizedEmail = command.email.trim().toLowerCase();
    const existingUser = await this.userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new ConflictException("Email is already in use");
    }

    const passwordHash = await hash(command.password, this.PASSWORD_SALT_ROUNDS);

    const user = this.userRepository.create({
      email: normalizedEmail,
      password: passwordHash,
      firstName: command.firstName?.trim() || null,
      lastName: command.lastName?.trim() || null,
      avatarUrl: null,
      authProvider: UserAuthProvider.LOCAL,
      googleId: null,
      emailVerified: false,
      status: UserStatus.ACTIVE,
      lastLoginAt: null,
    });

    return this.userRepository.save(user);
  }
}
