
"use client"


import { useState, useEffect } from "react";
import NavigatorBar from "./Header/NavigatorBar";
import ProgressIndicator from "./Header/ProgressIndicator";
import Banner from "./Header/Banner";


const Header = () => {
    const images = [
        "/images/02737.png",
        "/images/02738.png"
    ];

    const [current_image_index, set_current_image_index] = useState(0);
    const [is_nav_visible, set_is_nav_visible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            set_current_image_index((prev_index) => (prev_index + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handle_scroll = () => {
            const scroll_position = window.scrollY;
            const doc_height = document.documentElement.scrollHeight - window.innerHeight;
            const scroll_percentage = (scroll_position / doc_height) * 100;

            if (scroll_percentage > 5)
                set_is_nav_visible(true);
            else
                set_is_nav_visible(false);
        };

        window.addEventListener("scroll", handle_scroll);
        
        return () => {
            window.removeEventListener("scroll", handle_scroll);
        };
    }, []);

    if (images.length === 0)
        return (
            <div>
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );

        return (
            <div className="relative w-full h-screen">
                {/* Navigator Bar */}
                <div
                    className={`fixed
                                pt-1 
                                top-0 
                                left-0 
                                w-full 
                                z-10 
                                transition-all 
                                duration-500 
                                ease-in-out ${
                        is_nav_visible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-full"
                    }`}
                >
                    <ProgressIndicator />
                    <NavigatorBar />
                    <div className="divider w-32"></div>
                </div>
    
                {/* Background Image */}
                <img
                    src={images[current_image_index]}
                    alt="Header Background"
                    className="w-full h-full object-cover"
                />

                <Banner />

                {/* Scroll Hint */}
                <div className="absolute
                                bottom-8 
                                left-1/2 
                                transform 
                                -translate-x-1/2 
                                text-white 
                                text-center 
                                opacity-80 
                                transition-all 
                                duration-300 
                                ease-in-out">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full hidden sm:flex">
                        <span className="text-xl font-semibold pt-1">Scroll Down</span>
                        <div className="mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-8 h-8 text-white animate-bounce">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="p-2 bg-black bg-opacity-50 rounded-full flex sm:hidden">
                        <span className="text-xl font-semibold pt-1">Slide Down</span>
                        <div className="mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-8 h-8 text-white animate-bounce">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Header;
