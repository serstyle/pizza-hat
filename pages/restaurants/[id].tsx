import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useContext, useEffect, useState } from 'react';
import { Cart } from '../../components/Cart/Cart';
import { ListMenu } from '../../components/ListMenu/ListMenu';
import { Modal } from '../../components/Modal/Modal';
import { CartContext } from '../../context/cartContext';
import { loadRestaurants } from '../../lib/api';
import { pizzaAppEndpoint } from '../../lib/const/pizzaapp';
import useFetch from '../../lib/hooks/useFetch';
import { useLocalStorage } from '../../lib/hooks/useLocaleStorage';
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
    //Here we need to use getRestaurant but the API always render the same restaurant ... see api.ts line 11
    const restaurants = await loadRestaurants();
    // Could also use @ts-ignore:
    const restaurant = restaurants.find((r) => r.id === +((params as ParsedUrlQuery).id as string) );
    return { props: { restaurant } };
};

const RestaurantView: NextPage<IProps> = ({ restaurant }) => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useFetch<IMenuItem[]>(`${pizzaAppEndpoint}/restaurants/${id}/menu`);
    const [localCart] = useLocalStorage<any>('cart', '');

    const cartContext = useContext(CartContext);
    const { cart, resetCart, setRestaurant } = cartContext;

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(()=>{
        setRestaurant(id as string);
        if(localCart.restaurantId !== id) {
            resetCart();
        }
    }, [id])


    // Calculate cart length and close modal if it's empty
    useEffect(() => {
        const total = cart.reduce((pV, cV) => pV + cV.quantity, 0);
        setTotalQuantity(total);
        !cart.length && setIsOpen(false) 
    }, [cart]);



    return (
        <div className="mb-20">
            {totalQuantity > 0 && (
                <button
                    className="fixed bottom-8 left-1/2 max-w-md -translate-x-1/2 w-4/5 py-2 bg-black text-center text-white"
                    onClick={() => setIsOpen(true)}
                >
                    Open Cart ({totalQuantity})
                </button>
            )}
            {isOpen && (
                <Modal isOpen={isOpen} title={'Your Cart'} onClose={() => setIsOpen(false)}>
                    <Cart restaurantId={id as string}/>
                </Modal>
            )}
            <h1 className="text-2xl text-center py-4">{restaurant.name}</h1>
            {error && <p>There is an error.</p>}
            {!data ? <p>Loading...</p> : <ListMenu menu={data} />}
        </div>
    );
};

export default RestaurantView;
