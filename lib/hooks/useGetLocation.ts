import { useEffect, useState } from 'react';

export default function useGetLocation() {
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const success = (pos) => {
        const crd = pos.coords;
        setLat(`${crd.latitude}`);
        setLong(`${crd.longitude}`);
    };
    useEffect(() => navigator.geolocation.getCurrentPosition(success), []);
    return [lat, long];
}
