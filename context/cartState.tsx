import React, { useState, useReducer } from 'react';

import { CartContext } from './cartContext';
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT, RESET_CART } from './cartReducers';

const CartState = (props) => {
    const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });

    const addProductToCart = (product) => {
        dispatch({ type: ADD_PRODUCT, product: product });
    };

    const removeProductFromCart = (productId) => {
        dispatch({ type: REMOVE_PRODUCT, productId: productId });
    };
    const resetCart = () => {
        dispatch({ type: RESET_CART });
    };

    return (
        <CartContext.Provider
            value={{
                cart: cartState.cart,
                addProductToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                resetCart: resetCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
