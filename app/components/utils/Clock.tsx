// components/Clock.tsx
'use client';  // 如果你使用的是 Next.js 13+ 的 App Directory，确保使用 'use client' 来启用客户端渲染

import { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState<string>('');

  // 每秒更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    }, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xl font-semibold">
      当前时间: {time}
    </div>
  );
};

export default Clock;
