import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [CoreModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: []
})
export class AuthModule { }