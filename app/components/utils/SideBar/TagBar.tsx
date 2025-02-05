

import Link from "next/link";

const TagsBar = () => {
    return (
        <div className="space-x-2 space-y-1">
            <div className="badge badge-outline">
                <Link href="">React</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">Next.js</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">C++</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">Boost</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">TailWind</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">daisyUI</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">TypeScript</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">HTML</Link>
            </div>
            <div className="badge badge-outline ">
                <Link href="">Node.js</Link>
            </div>
        </div>
    );
}

export default TagsBar;