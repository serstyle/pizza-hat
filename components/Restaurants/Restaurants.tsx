import React, { useEffect, useState } from 'react';
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

    const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const radlat1 = (Math.PI * lat1) / 180;
        const radlat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radtheta = (Math.PI * theta) / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        dist = dist / 1000;
        return dist;
    };
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
        <div className="grid px-4">
            {sortedRestaurants?.map((restaurant, i) => (
                <div key={i}>
                    <RestaurantCard restaurant={restaurant} />
                </div>
            ))}
        </div>
    );
};
