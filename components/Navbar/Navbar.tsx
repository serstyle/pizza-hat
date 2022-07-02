import React from 'react';
import Link from 'next/link';
import s from './Navbar.module.css'
export const NavigationBar = () => {
    return (
        <nav className={s.navbar}>
            <ul className="flex justify-between w-4/5 mx-auto">
                <li>
                    <Link href="/">Restaurants</Link>
                </li>
                <li>
                    <Link href="/">Orders</Link>
                </li>
                <li>
                    <Link href="/">Cart</Link>
                </li>
            </ul>
        </nav>
    );
};
