import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Button } from '../../components/Button/Button';

import { getOrderWithMenuAndRestaurant } from '../../lib/api';
import { IOrderResponseWithFullCart } from '../../types';

export interface IProps {
    orderWithMenuAndRestaurant: IOrderResponseWithFullCart;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const orderWithMenuAndRestaurant = await getOrderWithMenuAndRestaurant(`${context.params?.orderId}`);
    return {
        props: {
            orderWithMenuAndRestaurant,
        },
    };
};

const OrderView: NextPage<IProps> = ({ orderWithMenuAndRestaurant }) => {
    return (
        <div className="mx-4 p-4 bg-white">
            <h2 className="text-center">Order no.{orderWithMenuAndRestaurant.orderId}</h2>
            <h3 className="font-bold text-xl mb-4">{orderWithMenuAndRestaurant.restaurant?.name}</h3>
            <div className="mb-4">
                <p className="font-semibold">Status: {orderWithMenuAndRestaurant.status}</p>
                <p className="text-gray-300">Ordered at: {orderWithMenuAndRestaurant.orderedAt}</p>
                <p>Estimate delivery at: {orderWithMenuAndRestaurant.esitmatedDelivery}</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg">Your order: </h3>
                <>
                    {orderWithMenuAndRestaurant.cart.map((cartItem) => {
                        return (
                            <div key={cartItem?.id}>
                                <p className="mb-2">
                                    <span className="py-1 px-2 bg-gray-100">{cartItem?.quantity}</span>{' '}
                                    <span className="ml-2">{cartItem?.name}</span>
                                </p>
                            </div>
                        );
                    })}
                </>
                <p className="py-2 my-2 border-t">
                    Total: <span className="font-semibold">{orderWithMenuAndRestaurant.totalPrice} SEK</span>
                </p>
            </div>
            <Link href={`/restaurants/${orderWithMenuAndRestaurant.restuarantId}`}>
                <Button text="Order Again" />
            </Link>
        </div>
    );
};

export default OrderView;
