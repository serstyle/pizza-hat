import { ReactNode } from 'react';
import { NavigationBar } from '../Navbar/Navbar';

export interface IProps {
    children: ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <>
            <NavigationBar />
            <main className="pt-16 max-w-7xl mx-auto">{children}</main>
        </>
    );
}
