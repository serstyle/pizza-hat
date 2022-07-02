import React, { useState, useReducer } from 'react';

import { CartContext } from './cartContext';
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from './cartReducers';

const CartState = (props) => {
    // const [cart, setCart] = useState([]);
    const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });

    const addProductToCart = (product) => {
        dispatch({ type: ADD_PRODUCT, product: product });
    };

    const removeProductFromCart = (productId) => {
        dispatch({ type: REMOVE_PRODUCT, productId: productId });
    };

    return (
        <CartContext.Provider
            value={{
                cart: cartState.cart,
                addProductToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
