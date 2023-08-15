import React, { useState } from "react";
import Menu from '../../public/menu2.png';
import Image from "next/image";
import Logo from '../../public/air logo.png'
import AboutModal from "./AboutModal";
import UpdatesModal from "./UpdatesModal";

interface NavbarProps {
  // Define props here
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 absolute w-full z-20 shadow-[rgba(0,_0,_0,_0.4)_0px_10px_10px]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 z-10 relative">
          <a href="#" className="flex items-center">
              <Image src={Logo}  width={30} height={30}  className="h-10 mr-3 w-10" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AERO</span>
          </a>
          <button onClick={handleMenuToggle} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <Image src={Menu} width={30} alt="Burger menu icon"/>
          </button>
          <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto 2xl:flex 2xl:p-2`} id="navbar-default" >
            {/* <h3 className="block mr-5 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Air Pollution Data Tracker</h3> */}
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li><AboutModal /></li>
              <li><UpdatesModal /></li>
              {/* <li><a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Graph</a></li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
