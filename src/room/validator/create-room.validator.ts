import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRoomValidator {
    @IsNotEmpty()
    @IsNumber()
    maxPlayers: number
}