import { useRef, useState, useEffect } from 'react'
import { HomeIcon, DocumentAddIcon, ViewBoardsIcon, DatabaseIcon } from "@heroicons/react/outline"
import Link from 'next/link'


function sidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  const sidebar = useRef(null);
  const trigger = useRef(null);
  if (typeof window !== 'undefined') {
    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

    useEffect(() => {
      localStorage.setItem('sidebar-expanded', sidebarExpanded);
      if (sidebarExpanded) {
        document.querySelector('body').classList.add('sidebar-expanded');
      } else {
        document.querySelector('body').classList.remove('sidebar-expanded');
      }
    }, [sidebarExpanded]);
  }

  return (
    <div className="">
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* logo */}
          <img src="favicon.png" className="block w-8 h-8" />
        </div>
        {/* links */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
          </div>
          <Link href="/" >
            <a className='flex text-gray-300 pl-3'>
              <HomeIcon className='h-6 w-6' />
              <p className='pl-2 lg:hidden lg:sidebar-expanded:block 2xl:block'>Dashboard</p>
            </a>
          </Link>
          <Link href="/viewProperties">
            <a className='flex text-gray-300 pl-3'>
              <ViewBoardsIcon className='h-6 w-6' />
              <p className='pl-2 lg:hidden lg:sidebar-expanded:block 2xl:block'>View Properties</p>
            </a>
          </Link>
          <Link href="/addProperties">
            <a className='flex text-gray-300 pl-3'>
              <DocumentAddIcon className='h-6 w-6' />
              <p className='pl-2 lg:hidden lg:sidebar-expanded:block 2xl:block'>Add Property</p>
            </a>
          </Link>
          <Link href="/leads">
            <a className='flex text-gray-300 pl-3'>
              <DatabaseIcon className='h-6 w-6' />
              <p className='pl-2 lg:hidden lg:sidebar-expanded:block 2xl:block'>Leads</p>
            </a>
          </Link>
        </div>

        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-gray-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-gray-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default sidebar
