import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "../../domains/entities/user.entity";
import { UserRepository } from "../../domains/repositories/user.repository";
import { CreateUserPayload } from "../../domains/repositories/types/create-user.payload";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
  }

  create(payload: CreateUserPayload): UserEntity {
    return this.userRepository.create(payload);
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
