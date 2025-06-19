import { Module } from "@nestjs/common";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Room, RoomSchema } from "./schema/room.schema";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [
        CoreModule,
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])
    ],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [MongooseModule]
})
export class RoomModule { }