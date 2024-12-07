import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from 'src/users/entities/log-in-user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController, PassportAuthController],
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: 'secret-api-key',
      signOptions: {
        expiresIn: '1d'
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'})
  ]
})
export class AuthModule {}
