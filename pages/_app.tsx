import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CartState from '../context/cartState';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CartState>
            <Component {...pageProps} />
        </CartState>
    );
}

export default MyApp;
