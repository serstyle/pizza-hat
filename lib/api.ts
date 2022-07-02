import { IMenuItem, IRestaurant } from '../types';

export async function loadRestaurants(): Promise<Array<IRestaurant>> {
    const res = await fetch('https://private-anon-d884c0cb85-pizzaapp.apiary-mock.com/restaurants/');
    const data = await res.json();

    return data;
}


// This API always return the same restaurant no matter the param provided
export async function getRestaurant(id:string): Promise<IRestaurant> {
    const res = await fetch(`https://private-anon-d884c0cb85-pizzaapp.apiary-mock.com/restaurants/${id}`);
    const data = await res.json();
    return data;
}

export async function getMenu(id:string): Promise<Array<IMenuItem>> {
    const res = await fetch(`https://private-anon-d884c0cb85-pizzaapp.apiary-mock.com/restaurants/${id}/menu`);
    const data = await res.json();

    return data;
}


