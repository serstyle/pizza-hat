import { useRouter } from 'next/router';
import React, { useReducer, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '../lib/hooks/useLocaleStorage';
import { ICartItem, IMenuItem } from '../types';

import { CartContext } from './cartContext';
import { cartReducer, CartActionKind } from './cartReducers';

export interface IProps {
    children: ReactNode;
}
const CartState = (props: IProps) => {
    const router = useRouter();
    const { id } = router.query;
    
    const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });

    const [localCart, setLocalCart] = useLocalStorage<any>('cart', cartState);
    const [localRestaurant] = useLocalStorage<string>('restaurant', '');

    useEffect(() => {
        setLocalCart(cartState);
    }, [cartState]);

    useEffect(() => {
        if(!id) {
            setCart(localCart.cart);
        }
        if(id && id === localRestaurant) {
            setCart(localCart.cart);
        }
    }, []);

    const addProductToCart = (product: IMenuItem) => {
        dispatch({ type: CartActionKind.ADD_PRODUCT, product });
    };

    const removeProductFromCart = (productId: number) => {
        dispatch({ type: CartActionKind.REMOVE_PRODUCT, productId });
    };
    const resetCart = () => {
        dispatch({ type: CartActionKind.RESET_CART });
    };
    const setCart = (cart: ICartItem[]) => {
        dispatch({ type: CartActionKind.SET_CART, cart });
    };

    return (
        <CartContext.Provider
            value={{
                cart: cartState.cart,
                addProductToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                resetCart: resetCart,
                setCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
