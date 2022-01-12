import { Body, Controller, Get, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/services/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}

      // @Get("/test")
      // async fetchAll(@Res() response) {
      //   const users = await this.userService.readAll();
      //   return response.status(HttpStatus.OK).json({
      //     users
      //   })
      // }

      @Get("/onlyauth")
      @UseGuards(AuthGuard("jwt"))
  async hiddenInformation(){
    return  "hidden information";
  }
  @Get("/anyone")
async publicInformation(){
return  "this can be seen by anyone";
}

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
      const user = await this.userService.create(registerDTO);
      const payload = {
      
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
      const user = await this.userService.findByLogin(loginDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }


    
}
