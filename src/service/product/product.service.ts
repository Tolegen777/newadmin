import { $api } from "../../api";
import { AxiosResponse } from "axios";
import { IProductNew, IProductOneResponse, IProductResponse, ISpec } from "../../types/IProduct";
import { IPagination } from "../../types/types";
import { ICategory } from "../../types/ICategory";
import { useTypedSelector } from "../../store";

export class ProductService {
    static async fetchProducts(pagination?: IPagination): Promise<AxiosResponse<IProductResponse>> {
        let limit = pagination?.limit || 5;
        let page = pagination?.page || 1;

        return $api.get<IProductResponse>(`product?limit=${limit}&page=${page}`)
    }
    static async fetchOneProduct(id: string): Promise<AxiosResponse<IProductOneResponse>> {
        return $api.get<IProductOneResponse>(`product/get-one/${id}`)
    }
    static async createProduct(product: IProductNew): Promise<AxiosResponse<IProductOneResponse>> {
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('categoryId', product.category);
        formData.append('smallDesc', product.smallDesc);
        formData.append('fullDesc', product.fullDesc);
        formData.append('price', String(product.price));
        formData.append('discount', String(product.discount));
        formData.append('shopId', String(product.shopId));
        formData.append('image', product.photos[0])
        product.photos.forEach(photo => {
            formData.append('photos', photo)
        })

        return $api.post<IProductOneResponse>(`product/`, formData)
    }
    static async updateProduct(product: IProductNew): Promise<AxiosResponse<IProductOneResponse>> {
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('categoryId', product.category);
        formData.append('smallDesc', product.smallDesc);
        formData.append('fullDesc', product.fullDesc);
        formData.append('price', String(product.price));
        formData.append('discount', String(product.discount));
        formData.append('shopId', String(product.shopId));
        formData.append('image', product.photos[0])
        product.photos.forEach(photo => {
            formData.append('photos', photo)
        })

        return $api.put<IProductOneResponse>(`product/${product.id}`, formData)
    }
    static async fetchCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>(`category`)
    }
    static async fetchSpecs(categoryId: string): Promise<AxiosResponse<ISpec[]>> {
        return $api.get<ISpec[]>(`spec/${categoryId}`)
    }
}
