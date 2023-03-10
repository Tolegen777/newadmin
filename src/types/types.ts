import {IProduct} from "./IProduct";
import {IUser} from "./IProfile";
import {string} from "yup";


export interface IClientsResponse {
    count: number
    result: IUser[]
}

interface Photo {
    id: number
    image: string
}

export interface ICategory {
    id: number
    name: string
    icon?: string
    children: ICategory[]
}

export interface SpecValue {
    id: number
    value: string
}

export interface ISpec {
    id: number
    title: string
    values: SpecValue[]
}

export interface IOrderProduct {
    id: number
    qty: number
    status: string
    product: IProduct
}

export interface IOrderShop {
    createdAt: string;
    id: number
    totalPrice: number
    status: string
    orderNo: any
    cardsId: any
    products: IOrderProduct[]
}

export interface IOrdersResponse {
    payment: IOrderShop[]
    success: IOrderShop[]
    cancelled: IOrderShop[]
}

export interface IPagination {
    page: number;
    limit: number;
}

export interface IFilters {
    title: string
    categoryId: string
    priceFrom: string
    priceTo: string
}

export interface IProductsSort {
    pagination: IPagination
    filters: IFilters
}

export interface IOneOrder {
    id: number
    totalPrice: number
    status: string
    createdAt: string,
    updatedAt: string,
    orderNo: any
    products: IOrderProduct[]
    order: IOrder
}

export interface IOrder {
    id: number,
    apartment: string,
    building: string,
    street: string,
    city: string,
    totalPrice: number,
    phone: string,
    basket: {
        id: number
    }
}

export interface IBasketUser {
    id: number,
    firstName: string,
    lastName: string,
    phone: string
}

export interface IAddSeller {
    shopId: number,
    email: string,
    ownerEmail: string
}

export interface IAddSeller {
    shopId: number,
    email: string,
    ownerEmail: string
}

export interface IUpdateSpecs {
    productId: number,
    specs: string
}


export interface IAdminRole {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    activated: boolean,
    activationLink: string,
    phone: string,
    blocked: boolean,
    avatar: any
}

export interface IOwner {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    activated: boolean,
    activationLink: string,
    phone: string,
    blocked: boolean,
    avatar: any
}

export interface ISendNotification {
    userId: number,
    message: string,
    read?: boolean

}

export interface IGetNotification {
    count: string | null,
    data: {
        notifications: ISendNotification[]
    }


}

export interface IUpdateSpecArr {
    productId: number,
    specs: ISpecArr[]

}

export interface ISpecArr {
    oldSpecId: number,
    newSpecId: number
}

export interface Name {
    _text: string;
}

export interface IGetCities {
    name: Name[]
}

export interface IItems {
    value: string | number | undefined
    name:string
}