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

export interface IShopProfile {
    logo:string,
    phone:string,
    instagram:string
}

export interface Role {
    id: number
    value: string
    description: string
}

export interface IProfileUpdate {
    id: number | undefined
    avatar: File | null
}

export interface IProfileUpdateData {
    id?:number | null
    logo?: string | null
    image?: File|null
    instagram?: string | null
    phone?:string | null
}