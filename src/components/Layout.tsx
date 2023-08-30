import React from "react";
import Footer from "./NavBar/Footer"
import Navbar from "./NavBar/Navbar"

interface LayoutProps {
  children: any,
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="content" className="overflow-hidden overscroll-none 2xl:items-start">
      <Navbar />
      { children }
      <Footer />
    </div>
  )
}

export default Layout