import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseValidator } from "src/core/validator/BaseValidator";
import { Room, RoomDocument } from "./schema/room.schema";
import { Model } from "mongoose";
import { CreateRoomValidator } from "./validator/create-room.validator";
import { customAlphabet } from 'nanoid';
import { JoinRoomValidator } from "./validator/join-room.validator";

@Injectable()
export class RoomService {
    constructor(
        private validator: BaseValidator,
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>
    ) { }

    async createRoom(inputs: Record<string, any>, user: Record<string, any>) {
        const { maxPlayers } = await this.validator.validateObject(inputs, CreateRoomValidator);
        const roomId = await this.createRoomId();
        const room = await this.roomModel.create({ roomId, maxPlayers, hostId: user.userId, hostUsername: user.username });
        return room;
    }

    async joinRoom(inputs: Record<string, any>, user: Record<string, any>) {
        const { roomId } = await this.validator.validateObject(inputs, JoinRoomValidator);
        const room = await this.roomModel.findOne({ roomId });
        if (!room) {
            throw new NotFoundException('Room not found');
        }
        if (room.players.length >= room.maxPlayers) {
            throw new BadRequestException('Room is full');
        }
        const player = { userId: user.userId, username: user.username };
        room.players.push(player);
        await room.save();
        return room
    }

    async createRoomId(): Promise<string> {
        const generateRoomId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);
        let roomId = ""
        let exists = true;

        while (exists) {
            roomId = generateRoomId();
            const doc = await this.roomModel.exists({ roomId });
            exists = doc !== null;
        }

        return roomId;
    }
}