import { API_KEY } from '$constants'
import { ItemResponseItem, ItemsResponse } from '$models'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Payload = FormData

interface UpdatePayload {
   id: string
   data: FormData
}

export const itemApi = createApi({
   reducerPath: 'itemApi',
   tagTypes: ['items'],
   baseQuery: fetchBaseQuery({ baseUrl: `${API_KEY}/api/item` }),
   endpoints: (build) => ({
      getItems: build.query<ItemsResponse, void>({
         query: () => '',
      }),
      getItem: build.query<ItemResponseItem, string>({
         query: (id: string) => ({
            url: '',
            params: {
               id: id,
            },
         }),
      }),
      addItem: build.mutation<Payload, Partial<Payload>>({
         query: (body) => ({
            url: ``,
            method: 'POST',
            body,
         }),
      }),
      updateItem: build.mutation<Payload, Partial<UpdatePayload>>({
         query: ({ id, data }) => ({
            url: ``,
            method: 'PUT',
            body: data,
            params: {
               id,
            },
         }),
      }),
      deleteItem: build.mutation<number, Partial<string>>({
         query: (id: string) => ({
            url: '',
            method: 'DELETE',
            params: {
               id: id,
            },
         }),
      }),
   }),
})

export const {
   useGetItemsQuery,
   useGetItemQuery,
   useAddItemMutation,
   useUpdateItemMutation,
   useDeleteItemMutation,
} = itemApi
