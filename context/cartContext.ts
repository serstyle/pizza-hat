import React from 'react';
import { ICartItem, IMenuItem } from '../types';

export interface ICartContext {
    cart: ICartItem[];
    restaurantId: string | null;
    ordersId: string[];
    addProductToCart: (product: IMenuItem) => void;
    removeProductFromCart: (productId: number) => void;
    resetCart: () => void;
    setCart: (cart:ICartItem[]) => void;
    setRestaurant: (restaurantId:string) => void;
    addOrder: (orderId:string) => void;
    setOrders: (ordersId:string[]) => void;
}
export const CartContext = React.createContext<ICartContext>({
    cart: [],
    restaurantId: null,
    ordersId: [],
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    resetCart: () => {},
    setCart: () => {},
    setRestaurant: () => {},
    addOrder: () => {},
    setOrders: () => {}
});
