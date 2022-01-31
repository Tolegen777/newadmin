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