import { Socket } from 'socket.io';
import { SocketIOMiddleWare, SocketMiddewareProps } from '../interface';

export const SocketMiddleware = ({ jwtService, configService }: SocketMiddewareProps): SocketIOMiddleWare => {
    return async (client: Socket, next) => {
        const { token } = client.handshake.query;
        try {
            client['user'] = await jwtService.verifyAsync(
                token as string,
                {
                    secret: configService.get('JWT_SECRET'),
                }
            );
            next()
        } catch (error) {
            console.log(error);
            next(new Error('Not Authorized!'));
        }
    };
};
