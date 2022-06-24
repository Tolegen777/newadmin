import {$api} from "../../api";
import {AxiosResponse} from "axios";
import {IProductNew, IProductOneResponse, IProductQuery, IProductResponse, ISpec} from "../../types/IProduct";
import {ICategory} from "../../types/ICategory";

export class ProductService {
    static async fetchProducts(query: IProductQuery): Promise<AxiosResponse<IProductResponse>> {
        return $api.get<IProductResponse>(`product`, {params: query})
    }

    static async fetchOneProduct(id: string): Promise<AxiosResponse<IProductOneResponse>> {
        return $api.get<IProductOneResponse>(`product/get-one/${id}`)
    }

    static async createProduct(product: IProductNew): Promise<AxiosResponse<IProductOneResponse>> {
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('categoryId', product.categoryId);
        formData.append('smallDesc', product.smallDesc);
        formData.append('fullDesc', product.fullDesc);
        formData.append('price', String(product.price));
        formData.append('discount', String(product.discount));
        formData.append('shopId', String(product.shopId));
        formData.append('avatar', product.subs[0]);
        if (Array.from(product.specs).length > 0) {
            formData.append('specs', Array.from(product.specs.values()).join(','))
        }
        product.subs.forEach(photo => {
            formData.append('subs', photo)
        })

        return $api.post<IProductOneResponse>(`shop/product`, formData)
    }

    static async updateProduct(product: IProductNew): Promise<AxiosResponse<IProductOneResponse>> {


        const formData = new FormData();

        formData.append('title', product.title);
        formData.append('categoryId', product.categoryId);
        formData.append('smallDesc', product.smallDesc);
        formData.append('fullDesc', product.fullDesc);
        formData.append('price', String(product.price));
        formData.append('discount', String(product.discount));
        formData.append('shopId', String(product.shopId));
        formData.append('image', product.subs[0]);
        if (Array.from(product.specs).length > 0) {
            formData.append('specs', Array.from(product.specs.values()).join(','))
        }
        product.images?.forEach(photo => {
            formData.append('images', photo)
        })

        return $api.put<IProductOneResponse>(`product/update/${product.id}`, formData)
    }


    static async fetchCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>(`category`)
    }

    static async fetchSpecs(categoryId: string): Promise<AxiosResponse<ISpec[]>> {
        return $api.get<ISpec[]>(`spec/${categoryId}`)
    }
}
