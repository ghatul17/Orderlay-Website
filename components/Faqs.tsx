"use client";
import React, { useState, useRef } from 'react';

interface IFaqs {
    question: string;
    answer: string;
}

const Faqs: React.FC<IFaqs> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null); // Ref to get the actual height of the answer

    const toggleAnswer = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className=" p-4 lg:p-6 rounded-md border border-[#E9EAE9] bg-white gap-2 lg:gap-4">
            <div onClick={toggleAnswer} className="flex items-center justify-between cursor-pointer">
                <h5 className="text-black font-jakarta text-[14px] sm:text-[16px] md:text-lg font-semibold leading-5">
                    {question}
                </h5>
                <div className="flex items-center justify-between">
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                            <line x1="16" y1="23.6006" x2="32" y2="23.6006" stroke="#272D27" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                            <line x1="16" y1="23.6006" x2="32" y2="23.6006" stroke="#272D27" />
                            <line x1="23.5" y1="32.1006" x2="23.5" y2="16.1006" stroke="#272D27" />
                        </svg>
                    )}
                </div>
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out "
                style={{
                    maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
                }}
            >
                <p className="text-[#272D27] font-jakarta text-[14px] sm:text-[16px] md:text-lg font-normal leading-7 text-left pr-16 mt-2 lg:mt-0">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default Faqs;
