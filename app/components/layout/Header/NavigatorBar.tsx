"use client";

const debounce = <A extends unknown[], R>(func: (...args: A) => R, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: A) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
};

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import SideBar from "./SideBar";
import ThemeSwitcher from "../../utils/Tools/ThemeSwitcher";

interface Article {
  id: number;
  title: string;
}

const SearchBox = ({
  isOpen,
  query,
  loading,
  searchResults,
  onInputChange,
  // onClose,
}: {
  isOpen: boolean;
  query: string;
  loading: boolean;
  searchResults: Article[];
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-14 right-0 p-2 bg-base-100 rounded-lg shadow-lg w-96">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search..."
          value={query}
          onChange={onInputChange}
        />
        <kbd className="kbd kbd-sm">Esc</kbd>
      </label>

      {loading && (
        <div className="mt-2 text-center text-sm text-gray-500">Loading...</div>
      )}

      <ul className="mt-2 max-h-64 overflow-y-auto">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <li key={result.id} className="py-2 hover:bg-base-200 rounded-lg">
              <Link href={`/articles/${result.id}`}>
                <div className="text-primary hover:underline px-2">
                  {result.title}
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className="py-2 text-center text-sm text-gray-500">
            No results found
          </li>
        )}
      </ul>
    </div>
  );
};

const NavigatorBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  // 获取搜索结果的函数
  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/articles/ajax_search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 使用防抖处理输入变化
  const debouncedFetchSearch = useRef(debounce(fetchSearchResults, 500)).current;

  // 每次 query 更新时触发搜索请求
  useEffect(() => {
    if (query) {
      debouncedFetchSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [query, debouncedFetchSearch]);

  // 监听点击空白区域收起搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isSearchOpen && event.key === "Escape") {
        setSearchOpen(false);
      }

      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // 缓存搜索结果列表
  const memoizedSearchResults = useMemo(
    () => searchResults,
    [searchResults]
  );

  return (
    <div className="navbar bg-base-100 fixed z-10 border-b-2 border-primary">
      <div className="navbar-start">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="btn btn-ghost btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>

        <div className="relative">
          <SideBar is_open={isSidebarOpen} set_is_open={setSidebarOpen} />
          <ThemeSwitcher />
        </div>
      </div>

      <div className="navbar-center">
        <Link href="/">
          <div className="btn btn-ghost text-xl">ppQwQqq.space</div>
        </Link>
      </div>

      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setSearchOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <SearchBox
          isOpen={isSearchOpen}
          query={query}
          loading={loading}
          searchResults={memoizedSearchResults}
          onInputChange={(e) => setQuery(e.target.value)}
          onClose={() => setSearchOpen(false)}
        />
      </div>
    </div>
  );
};

export default NavigatorBar;
