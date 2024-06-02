import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthHelper } from './helpers/auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/auth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { MockCreateListener } from './listeners/mock-create.listener';
import {InstallLuminaaListener} from "./listeners/install.listener";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_KEY'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRES') },
            }),
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthHelper, JwtStrategy, MockCreateListener, InstallLuminaaListener],
})
export class AuthModule {}
