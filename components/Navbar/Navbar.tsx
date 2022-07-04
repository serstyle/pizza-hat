import React, { useContext } from 'react';
import Link from 'next/link';
import s from './Navbar.module.css';
import { CartContext } from '../../context/cartContext';
import { useRouter } from 'next/router';

export const NavigationBar = () => {
    const cartContext = useContext(CartContext);
    const { cart, restaurantId } = cartContext;
    const router = useRouter();
    const { id } = router.query;


    return (
        <nav className={s.navbar}>
            <ul className="flex justify-between w-4/5 mx-auto">
                <li>
                    <Link href="/">Restaurants</Link>
                </li>
                <li>
                    <Link href="/orders">Orders</Link>
                </li>
                {cart.length > 0 && restaurantId !== id && (
                    <li>
                        <Link href={`/restaurants/${restaurantId && encodeURIComponent(restaurantId)}`}>Cart</Link>
                        &nbsp;({cart.reduce((pV, cV) => pV + cV.quantity, 0)})
                    </li>
                )}
            </ul>
        </nav>
    );
};
