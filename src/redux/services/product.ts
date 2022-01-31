import { IProduct, IProductNew, IProductResponse } from '../../types/IProduct';
import { baseApi } from './baseApi';
import axios from 'axios';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductResponse, string /*{ name?: string; priceFrom?: number; priceTo?: number }*/>({
      query: () => {
        // const { name, priceFrom, priceTo } = arg;
        return {
          url: 'product',
          // params: { name, priceFrom, priceTo },
        };
      },
      providesTags: ['products']
    }),
    getProductById: builder.query<IProduct, number>({
      query: (id) => ({
        url: `/product/get-one/${id}`,
      }),
      transformResponse: (data: { product: IProduct }) => {
        return data.product
      }
    }),
    createProduct: builder.mutation<IProduct[], IProductNew>({
      query: (product) => ({
        url: 'product',
        method: 'POST',
        body: { ...product, avatar: product.image }
      }),
      invalidatesTags: ['products']
    }),
    // updateProduct: builder.mutation<IOrder, IOrder>({
    //   query: (order) => ({
    //     url: `/order/${order.id}`,
    //     method: 'PUT',
    //     body: order
    //   }),
    //   invalidatesTags: ['orders']
    // })
  })
})

export const postProduct = async (product: IProductNew) => {
  try {
    const formData = new FormData();
    Object.entries(product).forEach((entry) => {
      formData.append(entry[0], entry[1])
    })

    const token = localStorage.getItem('access_token');
    const headers = {
      contentType: 'multipart/form-data',
      authorization: `Bearer ${token}`
    }
    return await axios.post('http://dev.adu24.com/product', formData, { headers }).then(res => res.data);
  } catch (err) {
    console.log(err);
  }
}

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation } = productApi;