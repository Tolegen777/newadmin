export interface Role {
  id: number
  value: string
  description: string
}

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
}

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

export interface IUserResponse {
  count: number
  result: IUser[]
}

export interface ILogin {
  email: string
  password: string
}

export interface ILoginResponse {
  access_token: string
  refresh_token: string
  user: IUser
}

interface Photo {
  id: number
  image: string
}

export interface IProduct {
  id: number
  title: string
  category: { id: number, name: string }
  smallDesc: string
  fullDesc: string
  price: number
  discount: number
  specs: number[]
  image: string
  photos: Photo[]
}


export interface IProductNew {
  title: string
  category: string
  smallDesc: string
  fullDesc: string
  price: number
  discount: number
  specs: number[]
  shopId: number
  image: any
  photos: any[]
}

export interface IProductResponse {
  products: IProduct[]
  count: number
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