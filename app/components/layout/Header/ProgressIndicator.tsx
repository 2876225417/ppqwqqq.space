

import React, { useState, useEffect } from "react";

const ProgressIndicator = () => {
    
    const [scroll_progress, set_scroll_progress] = useState(0);

    useEffect(() => {
        const handle_scroll = () => {
            const scroll_top = window.scrollY;
            const doc_height = document.documentElement.scrollHeight - window.innerHeight;
            const scroll_percent = (scroll_top / doc_height) * 100;
            set_scroll_progress(scroll_percent);
        };

        window.addEventListener("scroll", handle_scroll);

        return () => {
            window.removeEventListener("scroll", handle_scroll);
        };
    }, []);

    const handle_click = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className="fixed
                        top-0
                        left-0
                        w-full
                        h-2
                        shadow-md
                        bg-gray-700"
              style={{ zIndex: 1000}}
              onClick={ handle_click }>
            <div className="h-full bg-yellow-600"
                 style={{
                    width: `${scroll_progress}%`,
                    transition: `width 0.5s ease-in-out`,
                    
                 }} />

        </div>
    );
}

export default ProgressIndicator;