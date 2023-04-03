import { API_KEY } from '$constants';
import { OrderPayload, OrderResponseItem, OrdersResponse } from '$models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UpdatePayload {
    id: string;
    data: OrderPayload;
}

export const orderApi = createApi({
    reducerPath: 'orderApi',
    tagTypes: ['orders'],
    baseQuery: fetchBaseQuery({ baseUrl: `${API_KEY}/api/order` }),
    endpoints: (build) => ({
        getOrders: build.query<OrdersResponse, void>({
            query: () => '',
        }),
        getOrder: build.query<OrderResponseItem, string>({
            query: (id: string) => ({
                url: '',
                params: {
                    id: id,
                },
            }),
        }),
        addOrder: build.mutation<OrderPayload, Partial<OrderPayload>>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
        }),
        updateOrder: build.mutation<UpdatePayload, Partial<UpdatePayload>>({
            query: ({ id, data }) => ({
                url: ``,
                method: 'PUT',
                body: data,
                params: {
                    id,
                },
            }),
        }),
        deleteOrder: build.mutation<number, Partial<string>>({
            query: (id: string) => ({
                url: '',
                method: 'DELETE',
                params: {
                    id: id,
                },
            }),
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi;
