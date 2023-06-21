export type OrdersResponse = OrderResponseItem[];

export interface CartItem {
    id: string;
    quantity: number;
    size: string[];
}
export interface OrderResponseItem {
    id: string;
    cost: number;
    items: CartItem[];
    email: string;
    end_date: string;
    is_paid: boolean;
    name: string;
    phone: string;
    address: string;
    deliveryId: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}

export interface OrderPayload {
    cost: number;
    items: CartItem[];
    email: string;
    name: string;
    phone: string;
    address: string;
    deliveryId: string;
    is_paid: boolean;
    status: string;
}
