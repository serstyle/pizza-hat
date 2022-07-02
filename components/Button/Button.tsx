import React from 'react';

export interface IProps {
    text: string;
}

export const Button = ({ text }: IProps) => {
    return (
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded mt-4">
            {text}
        </button>
    );
};
