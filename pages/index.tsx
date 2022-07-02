import type { NextPage } from 'next';
import Head from 'next/head';
import { loadRestaurants } from '../lib/api';
import { IRestaurant } from '../types';
import { useEffect } from 'react';
import { Restaurants } from '../components/Restaurants/Restaurants';

export interface IProps {
    restaurants: IRestaurant[];
}

export async function getStaticProps() {
    const restaurants = await loadRestaurants();

    return { props: { restaurants } };
}

const Home: NextPage<IProps> = ({ restaurants }) => {
    useEffect(() => {
        console.log(restaurants);
    }, []);
    return (
        <div>
            <Head>
                <title>Pizza Hatttttt</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Restaurants restaurants={restaurants} />
        </div>
    );
};

export default Home;
