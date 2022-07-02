import React from 'react';
import { ICartItem, IMenuItem } from '../types';

export interface ICartContext {
    cart: ICartItem[];
    addProductToCart: (product: IMenuItem) => void;
    removeProductFromCart: (productId: number) => void;
    resetCart: () => void;
}
export const CartContext = React.createContext<ICartContext>({
    cart: [],
    addProductToCart: (product) => {},
    removeProductFromCart: (productId) => {},
    resetCart: () => {}
});
