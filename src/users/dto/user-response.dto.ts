import { Exclude, Expose } from 'class-transformer';
import { Role } from '../types/user.interface';

export class UserResponseDto {
  @Expose()
  userId: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: Role;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;
}