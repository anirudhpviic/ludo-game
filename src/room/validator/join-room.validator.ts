import { IsNotEmpty, IsString } from "class-validator";

export class JoinRoomValidator {
    @IsNotEmpty()
    @IsString()
    roomId: string
}