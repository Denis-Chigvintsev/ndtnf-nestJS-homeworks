/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { HashingService } from '../hashing/hashing.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const foundInDatabase: any = await this.usersService.findOneByEmail(
      signUpDto.email,
    );
    if (foundInDatabase) {
      return 'пользователь с таким email существует -- попробуйте другой email';
    } else {
      return await this.usersService.create({
        email: signUpDto.email,
        password: await this.hashingService.hash(signUpDto.password),
        name: signUpDto.name,
      });
    }
  }

  async signIn(signInDto: SignInDto) {
    const foundInDatabase: any = await this.usersService.findOneByEmail(
      signInDto.email,
    );

    if (!foundInDatabase) {
      return {
        message: 'такого пользователя не существует',
      };
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      foundInDatabase.password,
    );
    if (!isEqual) {
      return { message: 'пароль неверен' };
    }
    if (!foundInDatabase.name) {
      foundInDatabase.name = +Math.random();
    }
    const accessToken = await this.jwtService.signAsync(
      {
        id: foundInDatabase.id,
        email: foundInDatabase.email,
        name: foundInDatabase.name,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }
}
