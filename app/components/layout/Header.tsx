"use client";

import { useState, useEffect } from "react";
import NavigatorBar from "./Header/NavigatorBar";
import ProgressIndicator from "./Header/ProgressIndicator";
import Banner from "./Header/Banner";

const Header = () => {
    // 图片 URL 列表
    const [images, setImages] = useState([
        "/api/images/banner/1.jpg",
        "/api/images/banner/2.jpg"
    ]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 处理加载状态

    // 预加载图片
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages = [];
            for (const imgSrc of images) {
                const img = new Image();
                img.src = imgSrc;
                await img.decode().catch(() => console.error(`Failed to load image: ${imgSrc}`));
                loadedImages.push(imgSrc);
            }
            setImages(loadedImages);
            setIsLoading(false); // 预加载完成，取消加载状态
        };

        preloadImages();
    }, []);

    // 轮播图片
    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [images]);

    // 监听滚动事件，控制导航栏显示
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / docHeight) * 100;

            setIsNavVisible(scrollPercentage > 5);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 加载动画
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen">
            {/* 导航栏 */}
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
                    isNavVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
                }`}
            >
                <ProgressIndicator />
                <NavigatorBar />
                <div className="divider w-32"></div>
            </div>

            {/* 轮播背景图 */}
            <img
                src={images[currentImageIndex]}
                alt="Header Background"
                className="w-full h-full object-cover"
            />

            <Banner />

            {/* 滚动提示 */}
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
