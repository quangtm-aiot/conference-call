import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RegisterUserService } from "./applications/services/register-user.service";
import { UserEntity } from "./domains/entities/user.entity";
import { USER_REPOSITORY } from "./domains/repositories/tokens/user-repository.token";
import { UsersController } from "./infrastructures/controllers/users.controller";
import { TypeOrmUserRepository } from "./infrastructures/persistence/typeorm-user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    RegisterUserService,
    TypeOrmUserRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: TypeOrmUserRepository,
    },
  ],
  exports: [TypeOrmModule, RegisterUserService, USER_REPOSITORY],
})
export class UserModule {}
