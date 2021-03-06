import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { CartContext } from '../../context/cartContext';
import { postOrder } from '../../lib/api';
import { DarkButton } from '../Button/Button';

export interface IProps {
    restaurantId: string;
    setOrderLoading: () => void;
}

export const Cart = ({restaurantId, setOrderLoading}: IProps) => {
    const [totalPrice, setTotalPrice] = useState(0)
    
    const cartContext = useContext(CartContext);
    const { addProductToCart, removeProductFromCart, cart, resetCart, addOrder } = cartContext;
    
    const router = useRouter()
    
    useEffect(()=>{
        const total = cart.reduce((pV, cV) => pV + (cV.price * cV.quantity) , 0 )
        setTotalPrice(total);
    }, [cart])

    const handleOrder = async () => {
        const order = await postOrder(cart, restaurantId);
        if(order) {
            resetCart();
            setOrderLoading();
            addOrder(`${order?.orderId}`);
            router.push(`/orders/${order?.orderId}`);
        }
    }

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
                        <p className="w-3/12">{cartItem.price * cartItem.quantity} SEK</p>
                        <div className="w-1/12 flex flex-col justify-between text-2xl">
                            <button onClick={()=>addProductToCart(cartItem)}>+</button>
                            <button onClick={()=>removeProductFromCart(cartItem.id)}>-</button>
                        </div>
                    </div>
                );
            })}
            <div className="pt-3">
                <p>Total: <span className="font-semibold">{totalPrice} SEK</span></p>
                <DarkButton fullWidth text='Order' onClick={handleOrder}/> 
            </div>
        </div>
    );
};
