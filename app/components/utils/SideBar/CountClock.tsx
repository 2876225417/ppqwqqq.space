
"use client";

import { useEffect, useState } from "react";


const CountClock = () => {
    
    const [initial_time        ] = useState<Date>(new Date());
    const [counter, set_counter] = useState<number>(0);
    const [hours,   set_hours  ] = useState<number>(initial_time.getHours());
    const [minutes, set_minutes] = useState<number>(initial_time.getMinutes());
    const [seconds, set_seconds] = useState<number>(initial_time.getSeconds());
    
    useEffect(() => {
        const interval = setInterval(() => {
            set_counter((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const total_time = new Date(initial_time.getTime() + counter * 1000);
        const h          = total_time.getHours();
        const m          = total_time.getMinutes();
        const s          = total_time.getSeconds();
        set_hours(h);
        set_minutes(m);
        set_seconds(s);
    }, [counter, initial_time]);

    const formatted_hours   = String(hours).padStart(2, '0');
    const formatted_minutes = String(minutes).padStart(2, '0');
    const formatted_seconds = String(seconds).padStart(2, '0');

    return (
        <div>
            <span className="countdown font-mono text-2xl">
                <span style={{ "--value": formatted_hours   } as React.CSSProperties}></span>:
                <span style={{ "--value": formatted_minutes } as React.CSSProperties}></span>:
                <span style={{ "--value": formatted_seconds } as React.CSSProperties}></span>
            </span>
        </div>
    );
};

export default CountClock;