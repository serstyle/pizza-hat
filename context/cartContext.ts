import React from 'react';
import { ICartItem, IMenuItem } from '../types';

export interface ICartContext {
    cart: ICartItem[];
    restaurantId: string | null;
    addProductToCart: (product: IMenuItem) => void;
    removeProductFromCart: (productId: number) => void;
    resetCart: () => void;
    setCart: (cart:ICartItem[]) => void;
    setRestaurant: (restaurantId:string) => void;
}
export const CartContext = React.createContext<ICartContext>({
    cart: [],
    restaurantId: null,
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    resetCart: () => {},
    setCart: () => {},
    setRestaurant: () => {},
});
