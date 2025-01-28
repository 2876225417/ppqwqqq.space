

"use client"

import React, { useEffect, useState } from 'react';

const Cursor = () => {
    // 存储鼠标的坐标
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(true); // 控制指针的显示与隐藏

    // 监听鼠标移动事件
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        // 鼠标点击或悬停时可隐藏指针
        const handleMouseEnter = () => setCursorVisible(true);
        const handleMouseLeave = () => setCursorVisible(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: `${cursorPosition.y}px`,
                left: `${cursorPosition.x}px`,
                width: '30px',  // 指针的大小
                height: '30px',
                backgroundColor: 'transparent',  // 透明背景
                borderRadius: '50%',  // 圆形
                border: '2px solid #ff5733',  // 指针颜色，橙色边框
                pointerEvents: 'none',  // 确保自定义指针不会阻止鼠标事件
                transition: 'transform 0.1s ease',
                transform: 'translate(-50%, -50%)',  // 调整光标位置使其位于鼠标指针中心
                opacity: cursorVisible ? 1 : 0,  // 鼠标移出时指针透明
                zIndex: 9999,  // 保证自定义指针位于其他元素之上
            }}
        />
    );
};

export default Cursor;
