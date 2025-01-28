
"use client"

import { useEffect } from "react";

// import Calendar from "../../utils/SideBar/Calendar";
import TagsBar from "../../utils/SideBar/TagBar";

import SearchBox from "../../utils/SideBar/SearchBar";


interface SideBarProps {
    is_open: boolean;
    set_is_open: React.Dispatch<React.SetStateAction<boolean>>;
}



const SideBar: React.FC<SideBarProps> = ({ is_open, set_is_open }) => {


    const handle_drawer_toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_is_open(e.target.checked);
    };

    useEffect(() => {
        /* debug check drawer's state
        console.log(`Drawer is ${is_open ? "open" : "close"}`); */
    }, [is_open]);

    return (
        <div className="drawer
                        fixed
                        "
            style={{ zIndex: "10", }}>
            <input 
                id="sidebar"
                type="checkbox"
                className="drawer-toggle"
                checked={is_open}
                onChange={handle_drawer_toggle} />
            <div className="drawer-content 
                            flex 
                            flex-col 
                            items-center 
                            justify-center
                            fixed
                            left-2
                            top-2
                            ">
            </div>
            
            
            <div className="drawer-side">
                <div className="p-4 text-lg font-semibold">SideBar Title</div>
                <label 
                    htmlFor="sidebar" 
                    aria-label="close sidebar" 
                    className={`drawer-overlay 
                                ${ is_open ? "backdrop-blur-sm" : " "}`}></label>

                <div className="menu 
                                bg-base-200 
                                text-base-content 
                                min-h-full 
                                w-80 
                                p-4">
                    <div className="pb-3">
                        <SearchBox />
                    </div>
                    <div className="
                                    items-center
                                    sapce-x-4
                                    border-2
                                    rounded-xl
                                    p-3">
                                            
                        <div className="flex">
                            <div className="avatar">
                                <div className="w-24
                                                h-24
                                                rounded
                                                overflow-hidden">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <div className="pl-5">
                                <h2 className="text-xl font-semibold">Geek You</h2>
                                <p className="text-sm text-gray-500">github</p>
                                <p className="text-sm text-gray-500">2876225417</p>
                                <p className="text-sm text-gray-500">Discord</p>
                            </div>
                        </div>
                        <div className="pb-3 pt-3" >
                            <TagsBar />
                        </div>
                    </div>
                    <div className="pt-3">
                        <li><a>li1</a></li>
                        <li><a>li2</a></li>
                    </div>
                </div>                
            </div>
            <div>

            </div>
        </div>
        

    );
};

export default SideBar;