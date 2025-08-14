import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { TToken, TUser } from '../common/types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto): Promise<TUser> {
    return this.authService.signup(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Req() req: { user: TUser }): Promise<TToken> {
    return Promise.resolve(this.authService.signin(req.user));
  }
}
