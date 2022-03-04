import {ICategory} from "./ICategory";

export interface IProductCard {
    title: string
    price: number
    discount: number
    rating: null | string
    sells: number
    image: string
}
export interface IValue {
    id: number,
    value:string;
    title:ISpec
}
export interface ISpec {
    id: number,
    title: string
}
export interface IProduct {
    id: number
    title: string
    category:ICategory
    smallDesc: string
    fullDesc: string
    price: number
    discount: number
    specs: IValue[]
    image: string
    photos: Photo[]
}
export interface IProductOneResponse {
    product:IProduct;
    avg:number;
}
export interface IProducts{
    id: number
    title: string
    smallDesc: string
    fullDesc: string
    price: number
    discount: number
    image: string
    rating: null | string
    sells: string
}
interface Photo {
    id: number
    image: string
}

export interface IProductNew {
    id?: number
    title: string
    category: string
    smallDesc: string
    fullDesc: string
    price: number
    discount: number
    specs: number[]
    shopId: number
    image: File | null
    photos: File[]
}

export interface IProductResponse {
    products: IProducts[]
    count: number
}

export interface IProductQuery {
    shopId?: number
    categoryId?: string
    brandId?: string
    bestseller?: boolean
    almostFree?: boolean
    search: string
    tagId?: string
    priceFrom?: string
    priceTo?: string
    page?: number
    limit?: number
    block?: boolean
    confirm?: boolean
}
