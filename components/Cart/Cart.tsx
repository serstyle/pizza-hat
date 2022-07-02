import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { Button } from '../Button/Button';

export const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    const cartContext = useContext(CartContext);
    const { addProductToCart, removeProductFromCart, cart } = cartContext;
    useEffect(()=>{
        const total = cart.reduce((pV, cV) => pV + (cV.price * cV.quantity) , 0 )
        setTotalPrice(total);
    }, [cart])
    return (
        <div>
            {cart.map((cartItem) => {
                return (
                    <div key={cartItem.id} className="flex border-b py-2">
                        <p className="w-2/12">{cartItem.quantity}x</p>
                        <div className="w-6/12">
                            <p>{cartItem.name}</p>
                            {cartItem.topping && (
                                <p className="text-gray-500 mb-1">
                                    {cartItem.topping.map((t, i) => (
                                        <span key={i}>
                                            {t}
                                            {/* @ts-ignore: */}
                                            {i === cartItem.topping.length - 1 ? '.' : ','} &nbsp;
                                        </span>
                                    ))}
                                </p>
                            )}
                        </div>
                        <p className="w-2/12">{cartItem.price * cartItem.quantity}kr</p>
                        <div>
                            <button onClick={()=>addProductToCart(cartItem)}>+</button>
                            <button onClick={()=>removeProductFromCart(cartItem.id)}>-</button>
                        </div>
                    </div>
                );
            })}
            <div className="pt-3">
                <p>Total: {totalPrice}kr</p>
                <Button text='Order' /> 
            </div>
        </div>
    );
};
