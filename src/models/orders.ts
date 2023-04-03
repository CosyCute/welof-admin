export type OrdersResponse = OrderResponseItem[];

export interface CartItem {
    id: string;
    quantity: number;
    size: string;
}
export interface OrderResponseItem {
    id: string;
    cost: number;
    items: CartItem[];
    email: string;
    end_date: string;
    is_paid: string;
    name: string;
    phone: string;
    address: string;
    deliveryId: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderPayload {
    cost: number;
    items: { id: string; quantity: number }[];
    email: string;
    name: string;
    phone: string;
    address: string;
    deliveryId: string;
}
