import { JwtService } from "@nestjs/jwt";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SocketMiddleware } from "../middleware/socket.middleware";
import { ConfigService } from "@nestjs/config";
import { SOCKET_EVENT } from "../constants";

@WebSocketGateway({
    cors: { origin: '*' },
    transports: ['websocket'],
})
export class SocketGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        server.use(SocketMiddleware({ jwtService: this.jwtService, configService: this.configService }))
    }

    handleConnection(client: Socket) {
        client.emit('connected')
        console.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage(SOCKET_EVENT.LISTEN.JOIN_ROOM)
    async handleEventJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() body: Record<string, any>) {
        const user = client['user']
        const { roomId } = body
        client.join(roomId)
        client.to(roomId).emit(SOCKET_EVENT.EMIT.NEW_PLAYER, { userId: user.userId, username: user.username })
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
}