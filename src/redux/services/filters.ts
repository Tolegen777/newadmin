import { ICategory, ISpec } from "../types/types";
import { baseApi } from "./baseApi";

export const filtersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], string>({
      query: () => ({
        url: `/category`
      }),
      providesTags: ['categories']
    }),
    getSpecs: builder.query<ISpec[], string>({
      query: (categoryId) => ({
        url: `/spec/${categoryId}`
      }),
      providesTags: ['specs']
    }),
  })
})

export const { useGetCategoriesQuery, useGetSpecsQuery } = filtersApi;