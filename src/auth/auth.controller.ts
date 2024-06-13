import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.client
      .send('auth.register.user', registerUserDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
    return result;
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }


  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@Req() req) {
    console.log(req);
    return this.client.send('auth.verify.user', {});
  }
}
