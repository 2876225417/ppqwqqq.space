// "use client";

// import { useEffect, useState, useRef, useCallback, useMemo } from "react";
// import Link from "next/link";
// import SideBar from "./SideBar";
// import ThemeSwitcher from "../../utils/Tools/ThemeSwitcher";

// const debounce = <A extends unknown[], R>(func: (...args: A) => R, delay: number) => {
//     let timeout: ReturnType<typeof setTimeout>;
//     return (...args: A) => {
//         clearTimeout(timeout);
//         timeout =setTimeout(() => func(...args), delay);
//     };
// };

// interface Article {
//     id: number;
//     title: string;
// }

// const SearchBox = ({
//     isOpen,
//     query,
//     loading,
//     searchResults,
//     onInputChange,
//     onClose,
// }: {
//     isOpen: boolean;
//     query: string;
//     loading: boolean;
//     searchResults: Article[];
//     onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     onClose: () => void;
// }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="absolute top-14 right-0 p-2 bg-base-100 rounded-lg shadow-lg w-96">
//             <label className="input input-bordered flex items-center gap-2">
//                 <input
//                     type="text"
//                     className="grow"
//                     placeholder="Search...."
//                     value={query}
//                     onChange={onInputChange}
//                 />
//                     <kbd className="kbd kbd-sm">Esc</kbd>
//             </label>

//             {loading && (
//                 <div className="mt-2 text-center text-sm text-gray-500">Loading...</div>
//             )}

//             <ul className="mt-2 max-h-64 overflow-y-auto">
//                 {searchResults.length > 0 ? (
//                     searchResults.map((result) => (
//                         <li key={result.id} className="py-2 hover:bg-base-200 rounded-lg">
//                             <Link href={`/articles/${result.id}`}>
//                                 <div className="text-primary hover:underline px-2">
//                                     {result.title}
//                                 </div>
//                             </Link>
//                         </li>
//                     ))
//                 ) : (
//                     <li className="py-2 text-center text-sm text-gray-500">
//                         No results found
//                     </li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// const NavigatorBar = () => {
//     const [isSidebarOpen, ]
// }