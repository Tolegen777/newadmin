import { IUser } from "./IProfile";

export interface ILogin {
    email: string
    password: string
}

export interface ILoginResponse {
    access_token: string
    refresh_token: string
    user: IUser
}