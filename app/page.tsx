

// Home Page




// import Link from 'next/link'; 

import SubRightSideBar from './home/SubRightSideBar';
import ArticlesGrid from './home/ArticlesGrid';

export default function Home() {
  return (
    <div className="min-h-screen 
                    p-8 
                    pb-20 
                    sm:p-20 
                    font-[family-name:var(--font-geist-sans)]">
      <div className="grid 
                      grid-cols-1 
                      lg:grid-cols-4 
                      gap-8">
        <div className="lg:col-span-3">
          <div>
            <ArticlesGrid />
          </div>
        </div>    

        <div className="lg:col-span-1 hidden lg:block">
          <div>
            <SubRightSideBar />
          </div>
        </div>

      </div>
    </div>
    
  );
}
