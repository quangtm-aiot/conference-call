import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { RegisterUserCommand } from "../../applications/commands/register-user.command";
import { RegisterUserService } from "../../applications/services/register-user.service";
import { ResponseMessage } from "../../../../shared/infrastructures/decorators/response-message.decorator";
import { RegisterUserRequestDto } from "../dtos/register-user.request.dto";
import { RegisterUserResponseDto } from "../dtos/register-user.response.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage("User registered successfully")
  async register(
    @Body() body: RegisterUserRequestDto,
  ): Promise<RegisterUserResponseDto> {
    const user = await this.registerUserService.execute(
      new RegisterUserCommand(body.email, body.password, body.firstName, body.lastName),
    );

    return RegisterUserResponseDto.fromEntity(user);
  }
}
