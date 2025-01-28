

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="row-start-3
                           flex
                           gap-6
                           flex-wrap
                           items-center
                           justify-center
                           ">
            <p className="text-sm
                          text-gray-500">
                © {new Date().getFullYear()} ppqwqqq.space All Rights Reserved
            </p>

            <div className="flex
                            gap-4">
                <Link href="https://github.com/2876225417" 
                      className="text-gray-500
                                 hover:text-gray-700
                                 transition"
                      target="_blank">Github</Link>
                <Link href="https://twitter.com/"
                      className="text-gray-500
                                 hover:text-gray-700
                                 transition"
                      target="_blank">Twitter</Link>
            </div>
        </footer>
    );
};

export default Footer;