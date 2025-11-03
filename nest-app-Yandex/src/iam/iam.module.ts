import { Module } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './authentication/guards/api-key/api-key.guard';
import { AuthController } from './y-auth/auth/auth.controller';
import { AuthService } from './y-auth/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { YandexStrategy } from './y-auth/yandex.strategy/yandex.strategy';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    AuthenticationService,
    UsersService,
    AuthService,
    YandexStrategy,
  ],
  controllers: [AuthenticationController, AuthController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ session: true }),
  ],
})
export class IamModule {}
