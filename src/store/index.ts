import { materialApi } from '$store/api';
import { itemApi } from '$store/api/itemApi';
import { orderApi } from '$store/api/orderApi';
import { typeApi } from '$store/api/typeApi';
import commonSlice from '$store/slices/common';
import materialSlice from '$store/slices/materialSlice';
import modalSlice from '$store/slices/modalSlice';
import orderSlice from '$store/slices/orderSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    materialSlice,
    modalSlice,
    commonSlice,
    orderSlice,
    [materialApi.reducerPath]: materialApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [typeApi.reducerPath]: typeApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            })
                .concat(materialApi.middleware)
                .concat(itemApi.middleware)
                .concat(typeApi.middleware)
                .concat(orderApi.middleware),
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export * from './api';
export * from './slices';
