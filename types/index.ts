export interface IRestaurant {
    id: number;
    name: string;
    address1: string;
    address2: string;
    latitude: number;
    longitude: number;
}

export interface ISortedRestaurant extends IRestaurant {
    distanceFromUser: number;
}
export interface IMenuItem {
    id: number;
    category: string;
    name: string;
    topping?: string[];
    price: number;
    rank?: number;
}

export interface ICartItem extends IMenuItem {
    quantity: number;
}

export interface IOrderResponse {
    orderId: number;
    totalPrice: number;
    orderedAt: string;
    esitmatedDelivery: string;
    status: string;
}

export interface IOrderResponseWithCart extends IOrderResponse {
    cart: {
        menuItemId: number;
        quantity: number;
    }[];
    restuarantId: number;
}
export interface IOrderResponseWithFullCart extends IOrderResponse {
    restaurant: IRestaurant | null;
    cart: Array<ICartItem | null>;
    restuarantId: number;
}
