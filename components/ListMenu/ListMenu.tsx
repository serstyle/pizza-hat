import React, { useEffect, useState } from 'react';
import { IMenuItem } from '../../types';
import { MenuItem } from '../MenuItem/MenuItem';

export interface IProps {
    menu: IMenuItem[];
}
interface ICategoryWithMenuItems {
    category: string;
    menuItems: IMenuItem[];
}
export const ListMenu = ({ menu }: IProps) => {
    const [categoriesWithItems, setCategoriesWithItems] = useState<ICategoryWithMenuItems[] | null>(null);
    
    useEffect(() => {
        if (menu) {
            const categories = [...new Set(menu.map((o) => o.category))];
            const sortedByCategory = categories.map((c) => {
                return {
                    category: c,
                    menuItems: [],
                };
            });
            const menuSortedByCategory = sortedByCategory.map((itemSorted) => {
                const menuItems = menu.filter((menuItem) => menuItem.category === itemSorted.category);
                return {
                    ...itemSorted,
                    menuItems,
                };
            });
            setCategoriesWithItems(menuSortedByCategory);
        }
    }, [menu]);

    return (
        <>
            {categoriesWithItems?.map((cwi, i) => {
                return (
                    <div key={i}>
                        <h3 className='text-xl font-bold px-4 pt-4 pb-1 border-y'>{cwi.category}</h3>
                        {cwi.menuItems.map((menuItem) => {
                            return (
                                <React.Fragment key={menuItem.id}>
                                    <MenuItem menuItem={menuItem} />
                                </React.Fragment>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};
