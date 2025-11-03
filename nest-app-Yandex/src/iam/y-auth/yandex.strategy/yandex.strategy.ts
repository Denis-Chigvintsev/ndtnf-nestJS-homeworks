/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateYandexDto } from 'src/users/dto/create-yandex.dto';
import { UpdateYandexDto } from 'src/users/dto/update-yandex.dto';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.YANDEX_CLIENT_ID as string, // Your Yandex application ID
      clientSecret: process.env.YANDEX_CLIENT_SECRET as string, // Your Yandex application secret
      callbackURL: process.env.YANDEX_CALLBACK_URL as string, // Your callback URL configured in Yandex
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,

    done: any,
  ) {
    let user: any;
    const prof = {
      yandexId: profile.id,
      userName: profile.username,
      name: profile.displayName,
      email: profile.emails[0].value,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    console.log(-1000, prof);
    const foundInDatabase = await this.usersService.findOneByYandexId(
      prof.yandexId,
    );
    if (!foundInDatabase) {
      const create_y_DTO: CreateYandexDto = {
        email: profile.emails[0].value,
        id: uuidv4(),
        y_Id: profile.id,
        y_name: profile.username,
        y_accessToken: profile.accessToken,
        y_refreshToken: profile.refreshToken,
        role: 'yandex',
      };

      user = await this.usersService.create(create_y_DTO);
    } else {
      const update_y_DTO: UpdateYandexDto = {
        email: profile.emails[0].value,
        y_Id: profile.id,
        y_name: profile.username,
        y_accessToken: profile.accessToken,
        y_refreshToken: profile.refreshToken,
        role: 'yandex',
      };

      user = await this.usersService.Y_update(foundInDatabase.id, update_y_DTO);
    }

    done(null, user);
  }
}
