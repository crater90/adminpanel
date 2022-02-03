import { SearchIcon, BellIcon, UserIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react";

function Header({
  sidebarOpen,
  setSidebarOpen
}) {

  const {data: session} = useSession();
    return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center justify-end space-x-4">
            { session ? (
              <>
                <SearchIcon className="h-6"/>
                <BellIcon className="h-6"/>
                <img onClick={signOut} className="h-10 rounded-full cursor-pointer" src={session?.user?.image} alt="profile pic" />
              </>
            ) : (
              <>
                <SearchIcon className="h-6"/>
                <BellIcon className="h-6"/>
                <UserIcon className="h-6"/>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
    )
}

export default Header
