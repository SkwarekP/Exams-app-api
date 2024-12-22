import { Role } from "src/users/types/user.interface";

export interface AuthRes {
    accessToken: string;
    userId: string;
    username: string;
    role: Role;
    createdAt: string;
    expiresAt: string;
}

export interface SignIn {
    userId: string,
    username: string,
    role: Role
}