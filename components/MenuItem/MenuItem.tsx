import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { IMenuItem } from '../../types';
import { Button } from '../Button/Button';
import s from './MenuItem.module.css';
export interface IProps {
    menuItem: IMenuItem;
}

export const MenuItem = ({ menuItem }: IProps) => {
    const [itemQuantity, setItemQuantity] = useState(0);
    const cartContext = useContext(CartContext);
    const { addProductToCart, cart } = cartContext;
    useEffect(() => {
        const quantity = cart.find((cartItem) => cartItem.id === menuItem.id)?.quantity;
        setItemQuantity(quantity ? quantity : 0);
    }, [cart]);
    return (
        <div className={`${s.menuItem}`}>
            <p className="font-bold">
                {itemQuantity > 0 && `${itemQuantity}x `} {menuItem.name}
            </p>
            {menuItem.topping && (
                <p className="text-gray-500 mb-1">
                    {menuItem.topping.map((t, i) => (
                        <span key={i}>{t},&nbsp;</span>
                    ))}
                </p>
            )}
            <p className="text-gray-500">{menuItem.price} SEK</p>
            <Button onClick={() => addProductToCart(menuItem)} text={'Add'} />
        </div>
    );
};
