import { ICartItem, IMenuItem, IOrderResponse, IOrderResponseWithCart, IOrderResponseWithFullCart, IRestaurant } from '../types';
import { pizzaAppEndpoint } from './const/pizzaapp';

export async function loadRestaurants(): Promise<Array<IRestaurant>> {
    const res = await fetch(`${pizzaAppEndpoint}/restaurants/`);
    const data = await res.json();

    return data;
}

// This API always return the same restaurant no matter the param provided
// export async function getRestaurant(id: string): Promise<IRestaurant> {
//     const res = await fetch(`${pizzaAppEndpoint}/restaurants/${id}`);
//     const data = await res.json();
//     return data;
// }
export async function getRestaurant(id: string): Promise<IRestaurant | null> {
    const restaurants = await loadRestaurants();
    const restaurant = restaurants.find((r) => r.id === +id);
    if(restaurant) return restaurant;
    else return null;
}

export async function getMenu(id: string): Promise<Array<IMenuItem>> {
    const res = await fetch(`${pizzaAppEndpoint}/restaurants/${id}/menu`);
    const data = await res.json();

    return data;
}
export async function getOrder(orderId: string): Promise<IOrderResponseWithCart> {
    const res = await fetch(`${pizzaAppEndpoint}/orders/${orderId}`);
    const data = await res.json();
    return data;
}

export async function getOrderWithMenuAndRestaurant(orderId: string): Promise<IOrderResponseWithFullCart> {
    const order = await getOrder(orderId);
    //Why this restUArantId missspelling from the body response
    const restaurant = await getRestaurant(`${order.restuarantId}`);
    const menu = await getMenu(`${order.restuarantId}`);
    const data = {
        ...order,
        orderedAt: new Date(order.orderedAt).toLocaleString(),
        esitmatedDelivery: new Date(order.esitmatedDelivery).toLocaleString(),
        restaurant,
        cart: order.cart.map((cartItem) => {
            const orderCart = menu.find((menuItem) => menuItem.id === cartItem.menuItemId) || null;
            
            return orderCart && {
                ...orderCart,
                quantity: cartItem.quantity
            }
        })
    }
    return data;
}


export async function postOrder(cart: ICartItem[], restaurantId: string): Promise<IOrderResponse | null> {
    const newCart = cart.map((cartItem) => {
        return {
            menuItemId: cartItem.id,
            quantity: cartItem.quantity 
        }
    })

    const res = await fetch(`${pizzaAppEndpoint}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cart: newCart, restaurantId}) 
    });
    try {
        const data = await res.json();
        return data;

    } catch (e) {
        return null;
    }
}
