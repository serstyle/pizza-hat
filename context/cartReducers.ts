import { ICartItem, IMenuItem } from '../types';

export enum CartActionKind {
    ADD_PRODUCT = 'ADD_PRODUCT',
    REMOVE_PRODUCT = 'REMOVE_PRODUCT',
    RESET_CART = 'RESET_CART',
    SET_CART = 'SET_CART',
    SET_RESTAURANT = 'SET_RESTAURANT',
}

export interface CartAction {
    type: CartActionKind;
    product?: IMenuItem 
    productId?: number 
    cart?: ICartItem[];
    restaurantId?: string;
}

export interface CartState {
    cart: ICartItem[];
    restaurantId: string | null;
}

const addProductToCart = (product: IMenuItem, state: CartState) => {
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (updatedItemIndex < 0) {
        updatedCart.push({ ...product, quantity: 1 });
    } else {
        const updatedItem = {
            ...updatedCart[updatedItemIndex],
        };
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
    }
    return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId: number, state: CartState) => {
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex((item) => item.id === productId);

    const updatedItem = {
        ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
    } else {
        updatedCart[updatedItemIndex] = updatedItem;
    }
    return { ...state, cart: updatedCart };
};

const resetCart = (_action: CartAction, state: CartState) => {
    return { ...state, cart: [] };
};
const setCart = (cart: ICartItem[], state: CartState) => {
    return { ...state, cart };
};
const setRestaurant = (restaurantId: string, state: CartState) => {
    return { ...state, restaurantId };
};

export const cartReducer = (state: CartState, action: CartAction) => {
    switch (action.type) {
        case CartActionKind.ADD_PRODUCT:
            return addProductToCart(<IMenuItem>action.product, state);
        case CartActionKind.REMOVE_PRODUCT:
            return removeProductFromCart(<number>action.productId, state);
        case CartActionKind.RESET_CART:
            return resetCart(action, state);
        case CartActionKind.SET_CART:
            return setCart(<ICartItem[]>action.cart, state);
        case CartActionKind.SET_RESTAURANT:
            return setRestaurant(<string>action.restaurantId, state);
        default:
            return state;
    }
};
