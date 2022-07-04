import type { NextPage } from 'next';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { getOrderWithMenuAndRestaurant } from '../../lib/api';
import { IOrderResponseWithFullCart } from '../../types';

const OrdersView: NextPage = () => {
    const cartContext = useContext(CartContext);
    const { ordersId } = cartContext;
    const [orders, setOrders] = useState<IOrderResponseWithFullCart[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const orders = await Promise.all(
                ordersId.map(async (orderId): Promise<IOrderResponseWithFullCart> => {
                    const order = await getOrderWithMenuAndRestaurant(orderId);
                    return order;
                })
            );
            setOrders(orders);
            setIsLoading(false);
        })();

        return () => {};
    }, [ordersId]);

    return (
        <div className="mx-4 p-4 bg-white">
            {isLoading && <div>...Loading</div>}
            {!isLoading && !orders?.length && (
                <div>
                    <p>
                        No orders yet, go to{' '}
                        <Link href="/">
                            <a className="text-blue-500 hover:text-blue-800">Restaurants</a>
                        </Link>{' '}
                        to order pizzaaaa
                    </p>
                </div>
            )}
            {/* All the orders will looks the same since the mock api always return the same order from the post create API */}
            {!isLoading && orders?.map((order, i) => {
                return (
                    <div key={i} className="mb-8">
                        <Link href={`/orders/${order.orderId}`}>
                            <a>
                                <p className="font-semibold">{order.restaurant?.name}</p>
                                <p>Estimated Delivery: {order.esitmatedDelivery}</p>
                                <p>Status: {order.status}</p>
                                <p>{order.totalPrice} SEK</p>
                                <p className="text-blue-500 hover:text-blue-800">See more about no.{order.orderId}</p>
                            </a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default OrdersView;
