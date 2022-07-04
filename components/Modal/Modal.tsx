import React, { useEffect } from 'react';

export interface IProps {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({ children, title, isOpen, onClose }: IProps) => {
    useEffect(()=> {
        if(isOpen) document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
          };
    }, [isOpen])
    const handleClose = () => {
        onClose();
    };
    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-70 w-full h-full z-50">
            <div className="w-full h-full bg-white absolute top-0 left-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded md:w-128 md:h-auto max-h-full overflow-auto">
                <div className="p-4">
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
