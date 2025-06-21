import { Module } from "@nestjs/common";
import { SocketGateway } from "./gateway/socket.gateway";

@Module({
    imports: [],
    providers: [SocketGateway],
    exports: []
})
export class SocketModule { }