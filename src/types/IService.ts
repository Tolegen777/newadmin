import {Photo} from "./IProduct";

export interface IServiceUpdate {
    id: number | null,
    file: File[]
    categoryId: number | undefined | string;
    shopId: number | null;
    title: string;
    city: string;
    contactPerson: string;
    description: string;
    email: string;
    phone: string;
    price: number;
    discount: number;
}

export interface IServiceCreate {
    file: File[]
    categoryId: number | null;
    shopId: number | null;
    title: string;
    city: string;
    contactPerson: string;
    description: string;
    email: string;
    phone: string;
    price: number;
    discount: number;
}

export interface IServiceResponse {
    services: IService[]
    count: number
}

export interface IService {
    id: number;
    title: string;
    price: number;
    discount: number;
    avatar: string;
}

export interface Avatar {
    id: number;
    image: string;
}


export interface IOneServiceResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    city: string;
    contactPerson: string;
    email: string;
    phone: string;
    avatar: Avatar;
    photos: Photo[];
    category: {
        id: number;
        name: string;
        type: string;
        sort: null;
    }
}

export interface IGetServicesFilter {
    search?: string | undefined
    categoryId?: string | undefined
    page?: number | undefined,
    limit?: number | undefined,
    shopId?: number | unknown
}