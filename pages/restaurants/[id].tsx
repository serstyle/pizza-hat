import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ListMenu } from '../../components/ListMenu/ListMenu';
import { getMenu, loadRestaurants } from '../../lib/api';
import { pizzaAppEndpoint } from '../../lib/const/pizzaapp';
import useFetch from '../../lib/hooks/useFetch';
import { IMenuItem, IRestaurant } from '../../types';

export interface IProps {
    restaurant: IRestaurant;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const restaurants = await loadRestaurants();
    const paths = restaurants.map((restaurant) => ({
        params: { id: `${restaurant.id}` },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log(params);
    //Here we need to use getRestaurant but the API always render the same restaurant ... see api.ts line 11
    const restaurants = await loadRestaurants();
    const restaurant = restaurants.find((r) => r.id === +params.id);
    return { props: { restaurant } };
};

const RestaurantView: NextPage<IProps> = ({ restaurant }) => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useFetch<IMenuItem[]>(`${pizzaAppEndpoint}/restaurants/${id}/menu`);
    return (
        <div>
            {restaurant.name}
            {error && <p>There is an error.</p>}
            {!data ? <p>Loading...</p> : <ListMenu menu={data} />}
        </div>
    );
};

export default RestaurantView;
