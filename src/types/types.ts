import {IProduct} from "./IProduct";
import {IUser} from "./IProfile";


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
    shopId:number,
    email:string,
    ownerEmail:string
}