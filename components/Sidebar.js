import { useRef, useState, useEffect } from 'react'

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
            <img src="favicon.png" className="block w-8 h-8"/>
          </div>
          {/* links */}
          <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
                </h3>
                <ul className="mt-3">
                {/* Dashboard */}
                  <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
                    <div className={`block text-gray-200 hover:text-white truncate transition duration-150`}>
                      <div className="flex items-center">
                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                          <path className={`fill-current text-gray-400 `} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                          <path className={`fill-current text-gray-600 `} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                          <path className={`fill-current text-gray-400 `} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                        </svg>
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                      </div>
                    </div>
                  </li>
                  {/* add property */}
                  <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                    <div className={`block text-gray-200 hover:text-white truncate transition duration-150`}>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                        </svg>                      
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Add Property</span>
                      </div>
                    </div>

                  </li>
                </ul>
              </div>
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
