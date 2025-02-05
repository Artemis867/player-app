import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import NBLIcon from '../assets/nbl_logo_2.png';

export default function Navbar() {

  const navigate = useNavigate();
    const navigationMarkup = (
      <nav className="bg-[#1c1c1c] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={NBLIcon} className="h-8" alt="NBL Logo" width="40px"  />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-50">NBL</span>
            </a>
          <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-slate-50">
              <li>
                <a href="#" className="block py-2 px-3 text-slate-50" aria-current="page" onClick={(e) => {
                  e.preventDefault();
                  navigate('/home');
                }}>Home</a>
              </li>
              <li>
                {/* <a href="#" className="block py-2 px-3 text-slate-50" onClick={(e) => onLogout(e)}>Logout</a> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );

  return (
    <>
     {navigationMarkup}
    </>
  );
}
