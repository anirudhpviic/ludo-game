import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SignupValidator {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^.{6,}$/, {
        message: 'Password must be at least 6 characters long',
    })
    password: string;
}