import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";

export interface SocketIOMiddleWare {
    (client: Socket, next: (err?: Error) => void);
};

export interface SocketMiddewareProps {
    jwtService: JwtService;
    configService: ConfigService;
}
