import React from 'react';

export interface IProps {
    children: React.ReactNode;
    title: string;
    isOpen?: boolean;
    onClose: () => void;
}

export const Modal = ({ children, title, isOpen, onClose }: IProps) => {
    const handleClose = () => {
        onClose();
    };
    return (
        <div className="absolute top-0 bg-black bg-opacity-70 w-full h-full">
            <div className="w-96 bg-white absolute h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded">
                <div className="px-4">
                    <div className="flex justify-between border-b pb-4">
                        <p className="text-center flex-1">{title}</p>
                        <button onClick={handleClose}>Close</button>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};
