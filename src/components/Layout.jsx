import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
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