import Header from "./Header"
import Sidebar from "./Sidebar"
import { useState } from 'react';

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
              <main>{children}</main> 
            </div>
        </div>
    )
}

export default Layout
