export interface IRestaurant {
    id: number;
    name: string;
    address1: string;
    address2: string;
    latitude: number;
    longitude: number;
}

export interface ISortedRestaurant extends IRestaurant {
    distanceFromUser: number;
}
