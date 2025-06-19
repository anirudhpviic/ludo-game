import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: Record<string, any>) {
        const data = await this.authService.signup(body);
        return { message: "Success", data }
    }

    @Post('login')
    async login(@Body() body: Record<string, any>) {
        const data = await this.authService.login(body);
        return { message: "Success", data }
    }
}