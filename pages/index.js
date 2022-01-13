import Head from 'next/head'
import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Banner from '../components/Banner';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const {data: session} = useSession();
  //const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Sidebar */}
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      {/* Content area */}
      {/* <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"> */}

        {/* Header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/> */}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Bannner */}
            <Banner/>
              <div className="grid grid-cols-3 gap-6">
                <div className= "bg-gray-500 p-2">
                  1
                </div>
                <div className= "bg-gray-500 p-2">
                  2
                </div>
                <div className= "bg-gray-500 p-2">
                  3
                </div>
              </div>          
          </div>
        </main>
      {/* </div> */}
    </div>
  )
}
