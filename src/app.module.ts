import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [CoreModule, UserModule, AuthModule, RoomModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
