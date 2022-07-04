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

    const [cartState, dispatch] = useReducer(cartReducer, { cart: [], restaurantId: null, 
     });

    const [localCart, setLocalCart] = useLocalStorage<any>('cart', cartState);
    const [localRestaurant] = useLocalStorage<string>('restaurant', '');

    useEffect(() => {
        setLocalCart(cartState);
    }, [cartState]);

    useEffect(() => {
        if (id && id !== localCart.restaurantId) {
            setRestaurant(id as string);
        } else {
            setRestaurant(localCart.restaurantId);
        }
    }, []);

    useEffect(() => {
        if (!id) {
            setCart(localCart.cart);
        }
        if (id && id === localCart.restaurantId) {
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
    const setRestaurant = (restaurantId: string) => {
        dispatch({ type: CartActionKind.SET_RESTAURANT, restaurantId });
    };

    return (
        <CartContext.Provider
            value={{
                cart: cartState.cart,
                restaurantId: cartState.restaurantId,
                addProductToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                resetCart: resetCart,
                setCart,
                setRestaurant,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
