import React from 'react';

export interface IProps {
    text?: string;
    onClick?: () => void;
    fullWidth?: boolean;
    href?: string;
}

export const Button = ({ text, onClick, fullWidth }: IProps) => {
    return (
        <button onClick={onClick} className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded mt-4 ${fullWidth ? 'w-full' : 'w-fit'}`}>
            {text}
        </button>
    );
};
export const DarkButton = ({ text, onClick, fullWidth }: IProps) => {
    return (
        <button onClick={onClick} className={`bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 border border-gray-400 rounded mt-4 ${fullWidth ? 'w-full' : 'w-fit'}`}>
            {text}
        </button>
    );
};
export const LinkButton = React.forwardRef<HTMLAnchorElement, IProps>(({text, href, onClick}: IProps, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref as React.LegacyRef<HTMLAnchorElement>} className="bg-white cursor-pointer hover:bg-gray-100 inline-block text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded mt-4">
            {text}
        </a>
    );
});
