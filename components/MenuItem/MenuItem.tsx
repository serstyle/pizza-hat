import React from 'react';
import { IMenuItem } from '../../types';
import { Button } from '../Button/Button';
import s from './MenuItem.module.css';
export interface IProps {
    menuItem: IMenuItem;
}

export const MenuItem = ({ menuItem }: IProps) => {
    return (
        <div className={s.menuItem}>
            <p className="font-bold">{menuItem.name}</p>
            {menuItem.topping && (
                <p className="text-gray-500 mb-1">
                    {menuItem.topping.map((t, i) => (
                        <span key={i}>{t},&nbsp;</span>
                    ))}
                </p>
            )}
            <p className="text-gray-500">{menuItem.price}KR</p>
            <Button text={'Add'}/>
        </div>
    );
};
