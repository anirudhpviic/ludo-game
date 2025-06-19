import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/core/guards/auth.guard";
import { RoomService } from "./room.service";

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) { }

    @Post('create')
    @UseGuards(AuthGuard)
    async createRoom(@Req() req, @Body() body: Record<string, any>) {
        const user = req.user;
        const data = await this.roomService.createRoom(body, user);
        return { message: "Success", data }
    }

    @Post('join')
    @UseGuards(AuthGuard)
    async joinRoom(@Req() req, @Body() body: Record<string, any>) {
        const user = req.user;
        const data = await this.roomService.joinRoom(body, user);
        return { message: "Success", data }
    }
}