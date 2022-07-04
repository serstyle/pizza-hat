import Link from 'next/link';
import React from 'react';
import { ISortedRestaurant } from '../../types';
import { Button } from '../Button/Button';

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
                {restaurant.distanceFromUser && (
                    <p className="text-gray-400">{restaurant.distanceFromUser.toFixed(2)}KM away from you</p>
                )}
                <Button text={'See Menu'} />
            </a>
        </Link>
    );
};
