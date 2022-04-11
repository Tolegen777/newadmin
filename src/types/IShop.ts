import {IProduct} from "./IProduct";
import {IAdminRole, IOwner} from "./types";

export interface IShop {
    id: number
    name: string
    description: string
    logo: string | null
    legalAddress: string
    legalCity: string
    bin_iin: string
    instagram: string | null
    phone: string
    shop_type: string
    payment: boolean
    confirm: boolean
    view?: boolean,
    block?: boolean,
    admin_users?:IAdminRole[]|undefined,
    products?:IProduct[],
    owner?:IOwner,
    addresses?: Array<any>,






  }