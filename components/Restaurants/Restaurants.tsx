import React, { useEffect, useState } from 'react';
import { distance } from '../../lib/helpers/getDistance';
import useGetLocation from '../../lib/hooks/useGetLocation';
import { IRestaurant, ISortedRestaurant } from '../../types';
import { RestaurantCard } from '../Restaurant/RestaurantCard';

export interface IProps {
    restaurants: IRestaurant[];
}
export const Restaurants = ({ restaurants }: IProps) => {
    const [sortedRestaurants, setSortedRestaurants] = useState<ISortedRestaurant[] | null>(null);
    const [lat, long] = useGetLocation();

    useEffect(() => {
        const r = sortRestaurants(restaurants);
        setSortedRestaurants(r);
    }, []);

    const sortRestaurants = (restaurants: IRestaurant[]): ISortedRestaurant[] => {
        const sortedRestaurants = restaurants.map((r) => {
            const distanceFromUser = distance(+lat, +long, r.latitude, r.longitude);
            return {
                ...r,
                distanceFromUser,
            };
        });

        return sortedRestaurants.sort((a, b) => a.distanceFromUser - b.distanceFromUser);
    };

    return (
        <div className="grid px-4 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
            {sortedRestaurants?.map((restaurant, i) => (
                <div key={i}>
                    <RestaurantCard restaurant={restaurant} />
                </div>
            ))}
        </div>
    );
};
