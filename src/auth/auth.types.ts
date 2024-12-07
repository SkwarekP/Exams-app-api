
export interface AuthRes {
    accessToken: string;
    userId: string;
    username: string;
}

export interface SignIn {
    userId: string,
    username: string
}