import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RoomDocument = Room & Document

@Schema({ _id: false })
export class Player {
    @Prop({ required: true })
    userId: string

    @Prop({ required: true })
    username: string
}

const PlayerSchema = SchemaFactory.createForClass(Player);

export enum Status {
    WAITING = 'waiting',
    PLAYING = 'playing',
    FINISHED = 'finished'
}

export enum PlayerCount {
    TWO = 2,
    THREE = 3,
    FOUR = 4
}

@Schema({ timestamps: true })
export class Room {
    @Prop({ required: true, unique: true, index: true })
    roomId: string

    @Prop({ required: true })
    hostId: string

    @Prop({ required: true })
    hostUsername: string

    @Prop({ required: true, enum: PlayerCount, default: PlayerCount.TWO })
    maxPlayers: PlayerCount

    @Prop({ type: [PlayerSchema], default: [] })
    players: Player[]

    @Prop({ required: true, enum: Status, default: Status.WAITING })
    status: Status
}

export const RoomSchema = SchemaFactory.createForClass(Room);