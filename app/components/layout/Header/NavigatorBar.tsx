import { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import SideBar from "./SideBar";
import ThemeSwitcher from "../../utils/Tools/ThemeSwitcher";

interface Article {
    id: number;
    title: string;
}

const NavigatorBar = () => {
    const [is_sidebar_open, set_is_sidebar_open] = useState(false);
    const [is_search_open, set_is_search_open] = useState(false);
    const [query, set_query] = useState("");
    const [search_results, set_search_results] = useState<Article[]>([]); // 使用 Article[] 类型
    const [loading, set_loading] = useState(false);
    const search_box_ref = useRef<HTMLDivElement | null>(null);

    // 防抖函数，明确类型
    const debounce = <A extends unknown[], R>(func: (...args: A) => R, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: A) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };
    
    
    


    // 获取搜索结果的函数
    const fetch_search_results = async (query: string) => {
        if (!query.trim()) {
            set_search_results([]);
            return;
        }

        set_loading(true);

        try {
            const response = await fetch(`/api/articles/ajax_search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            console.log(data);
            set_search_results(data.results || []);
        } catch (error) {
            console.error("Error fetching search results: ", error);
        } finally {
            set_loading(false);
        }

        console.log("length: ", search_results.length);
    };

    // 使用防抖处理输入变化
    const debounced_fetch_search = useRef(debounce(fetch_search_results, 500)).current;

    // 每次 query 更新时触发搜索请求
    useEffect(() => {
        if (query) {
            debounced_fetch_search(query);
        } else {
            set_search_results([]);
        }
    }, [query, debounced_fetch_search]);

    const handle_sidebar_toggle = () => {
        set_is_sidebar_open((prev) => !prev);
    };

    const handle_search_toggle = () => {
        set_is_search_open((prev) => !prev);
    };

    const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_query(event.target.value);
    };

    // 监听点击空白区域收起搜索框
    useEffect(() => {
        const handle_click_outside = (event: MouseEvent) => {
            if (search_box_ref.current && !search_box_ref.current.contains(event.target as Node)) {
                set_is_search_open(false);
            }
        };

        document.addEventListener("mousedown", handle_click_outside);

        return () => {
            document.removeEventListener("mousedown", handle_click_outside);
        };
    }, []);

    // 键盘事件处理
    useEffect(() => {
        const handle_key_down = (event: KeyboardEvent) => {
            if (is_search_open && event.key === "Escape") {
                set_is_search_open(false);
            }

            if (event.ctrlKey && event.key === "k") {
                set_is_search_open(true);
            }
        };

        window.addEventListener("keydown", handle_key_down);
        return () => {
            window.removeEventListener("keydown", handle_key_down);
        };
    }, [is_search_open]);

    return (
        <div className="navbar bg-base-100 fixed z-10 border-b-2 border-primary">
            <div className="navbar-start">
                <button onClick={handle_sidebar_toggle} className="btn btn-ghost btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </button>

                <div className="relative">
                    <SideBar is_open={is_sidebar_open} set_is_open={set_is_sidebar_open} />
                    <ThemeSwitcher />
                </div>
            </div>

            <div className="navbar-center">
                <Link href="/">
                    <div className="btn btn-ghost text-xl">ppQwQqq.space</div>
                </Link>
            </div>

            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle" onClick={handle_search_toggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {is_search_open && (
                    <div ref={search_box_ref} className="absolute top-14 right-0 p-2 rounded-md w-96">
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search"
                                value={query}
                                onChange={handle_input_change}
                            />
                            <kbd className="kbd kbd-sm">Esc</kbd>
                        </label>

                        {/* 显示加载状态 */}
                        {loading && <div>Loading...</div>}

                        {/* 显示搜索结果 */}
                        <ul className="mt-2">
                            {search_results.length > 0 ? (
                                search_results.map((result, index) => (
                                    <li key={index} className="py-1">
                                        <Link href={`/articles/${result.id}`}>
                                            <div className="text-blue-600 hover:underline">{result.title}</div>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>No results found</li>
                            )}
                        </ul>
                    </div>
                )}

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NavigatorBar;
