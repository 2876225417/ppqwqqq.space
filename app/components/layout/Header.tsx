"use client";

import { useState, useEffect, useMemo } from "react";
import NavigatorBar from "./Header/NavigatorBar";
import ProgressIndicator from "./Header/ProgressIndicator";
import Banner from "./Header/Banner";

// 自定义 Hook：轮播逻辑
const useImageCarousel = (images: string[], interval: number = 10000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return currentImageIndex;
};

// 自定义 Hook：滚动监听
const useScrollVisibility = (threshold: number = 5) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / docHeight) * 100;

      setIsVisible(scrollPercentage > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isVisible;
};

const Header = () => {
  // 图片 URL 列表
  const images = useMemo(
    () => [
      "/api/images/banner/1.jpg",
      "/api/images/banner/2.jpg",
      // 添加更多图片 URL
    ],
    []
  );

  const [isLoading, setIsLoading] = useState(true); // 处理加载状态
  const currentImageIndex = useImageCarousel(images);
  const isNavVisible = useScrollVisibility();

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
      setIsLoading(false); // 预加载完成，取消加载状态
    };

    preloadImages();
  }, [images]);

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
        className={`fixed pt-1 top-0 left-0 w-full z-10 transition-all duration-500 ease-in-out ${
          isNavVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <ProgressIndicator />
        <NavigatorBar />
        <div className="divider w-32"></div>
      </div>

      {/* 轮播背景图 */}
      <div className="w-full h-full relative">
        {images.map((imgSrc, index) => (
          <img
            key={imgSrc} // 使用图片 URL 作为 key，确保每次切换时重新渲染
            src={imgSrc}
            alt="Header Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <Banner />

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center opacity-80 transition-all duration-300 ease-in-out">
        <div className="p-2 bg-black bg-opacity-50 rounded-full hidden sm:flex">
          <span className="text-xl font-semibold pt-1">Scroll Down</span>
          <div className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white animate-bounce"
            >
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
              className="w-8 h-8 text-white animate-bounce"
            >
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