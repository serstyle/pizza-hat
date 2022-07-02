import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import CartState from '../context/cartState';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CartState>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CartState>
    );
}

export default MyApp;
