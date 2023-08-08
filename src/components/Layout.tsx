import Footer from "./Footer"
import Navbar from "./Navbar"

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Make whole app no scroll
    <div id="content" className="overflow-hidden 2xl:items-start">
      <Navbar />
      { children }
      <Footer />
    </div>
  )
}

export default Layout