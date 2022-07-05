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
            {
                /* @ts-ignore: */
            }
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
                    <div className="md:px-4" key={i}>
                        <h3 className="text-xl font-bold px-4 pt-4 pb-1 border-y bg-gray-50 md:text-center">{cwi.category}</h3>
                        <div className="grid md:grid-cols-2 md:gap-2 md:my-4 lg:grid-cols-3">
                            {cwi.menuItems.map((menuItem) => {
                                return (
                                    <React.Fragment key={menuItem.id}>
                                        <MenuItem menuItem={menuItem} />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};
