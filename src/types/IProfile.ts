import { IShop } from "./IShop";

export interface IUser {
    id: number
    activated: boolean
    activationLink: string
    blocked: boolean
    avatar: string | null
    email: string
    phone: string
    firstName: string
    lastName: string
    roles: Role[]
    shops: IShop[]
}

export interface Role {
    id: number
    value: string
    description: string
}

export interface IProfileUpdate {
    id: number | undefined // profile ID
    avatar: File | null
}