import { IRestaurant } from '../types';

export async function loadRestaurants(): Promise<Array<IRestaurant>> {
    const res = await fetch('https://private-anon-d884c0cb85-pizzaapp.apiary-mock.com/restaurants/');
    const data = await res.json();

    return data;
}
