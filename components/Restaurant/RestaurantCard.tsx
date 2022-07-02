import Link from 'next/link';
import React from 'react';
import { ISortedRestaurant } from '../../types';

import s from './RestaurantCard.module.css';

export interface IProps {
    restaurant: ISortedRestaurant;
}

export const RestaurantCard = ({ restaurant }: IProps) => {
    return (
        <Link href={`/restaurants/${restaurant.id}`}>
            <a className={s.restaurantCard}>
                <p className="font-bold text-xl">{restaurant.name}</p>
                <p>{restaurant.address1}</p>
                <p className="text-gray-400">{restaurant.address2}</p>
                <p className="text-gray-400">{restaurant.distanceFromUser.toFixed(2)}KM away from you</p>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded mt-4">
                    See Menu
                </button>
            </a>
        </Link>
    );
};
