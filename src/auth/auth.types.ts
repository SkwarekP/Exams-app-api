
export interface AuthRes {
    accessToken: string;
    userId: string;
    username: string;
    createdAt: string;
    expiresAt: string;
}

export interface SignIn {
    userId: string,
    username: string
}