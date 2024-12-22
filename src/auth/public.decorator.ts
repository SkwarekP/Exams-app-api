import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/types/user.interface';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);