import { API_KEY } from '$constants'
import { TypeResponseItem, TypesResponse } from '$models'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Payload = {
   name: string
}

interface UpdatePayload {
   id: string
   data: {
      name: string
   }
}

export const typeApi = createApi({
   reducerPath: 'typeApi',
   tagTypes: ['types'],
   baseQuery: fetchBaseQuery({ baseUrl: `${API_KEY}/api/type` }),
   endpoints: (build) => ({
      getTypes: build.query<TypesResponse, void>({
         query: () => '',
      }),
      getType: build.query<TypeResponseItem, string>({
         query: (id: string) => ({
            url: '',
            params: {
               id: id,
            },
         }),
      }),
      addType: build.mutation<Payload, Partial<Payload>>({
         query: (body) => ({
            url: ``,
            method: 'POST',
            body,
         }),
      }),
      updateType: build.mutation<Payload, Partial<UpdatePayload>>({
         query: ({ id, data }) => ({
            url: ``,
            method: 'PUT',
            body: data,
            params: {
               id,
            },
         }),
      }),
      deleteType: build.mutation<number, Partial<string>>({
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
   useGetTypesQuery,
   useGetTypeQuery,
   useAddTypeMutation,
   useUpdateTypeMutation,
   useDeleteTypeMutation,
} = typeApi
