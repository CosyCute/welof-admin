import { API_KEY } from '$constants'
import { MaterialResponseItem, MaterialsResponse } from '$models'
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

export const materialApi = createApi({
   reducerPath: 'materialApi',
   tagTypes: ['materials'],
   baseQuery: fetchBaseQuery({ baseUrl: `${API_KEY}/api/material` }),
   endpoints: (build) => ({
      getMaterials: build.query<MaterialsResponse, void>({
         query: () => '',
      }),
      getMaterial: build.query<MaterialResponseItem, string>({
         query: (id: string) => ({
            url: '',
            params: {
               id: id,
            },
         }),
      }),
      addMaterial: build.mutation<Payload, Partial<Payload>>({
         query: (body) => ({
            url: ``,
            method: 'POST',
            body,
         }),
      }),
      updateMaterial: build.mutation<Payload, Partial<UpdatePayload>>({
         query: ({ id, data }) => ({
            url: ``,
            method: 'PUT',
            body: data,
            params: {
               id,
            },
         }),
      }),
      deleteMaterial: build.mutation<number, Partial<string>>({
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
   useGetMaterialsQuery,
   useGetMaterialQuery,
   useAddMaterialMutation,
   useUpdateMaterialMutation,
   useDeleteMaterialMutation,
} = materialApi
