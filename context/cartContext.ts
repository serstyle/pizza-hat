import React from 'react';
import { IMenuItem } from '../types';
export interface ICartItem extends IMenuItem {
    quantity: number;
}
export interface ICartContext {
    cart: ICartItem[];
    addProductToCart: (product: IMenuItem) => void;
    removeProductFromCart: (productId: number) => void;
}
export const CartContext = React.createContext<ICartContext>({
    cart: [],
    addProductToCart: (product) => {},
    removeProductFromCart: (productId) => {},
});
