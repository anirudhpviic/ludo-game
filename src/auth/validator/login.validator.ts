import { IsNotEmpty, IsString } from "class-validator";

export class LoginValidator {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}