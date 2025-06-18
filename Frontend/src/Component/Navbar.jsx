import React, { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setLogin, darkMode, setDarkMode, isLoggedIn, setToken }) => {
  const { token } = useContext(StoreContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        
        {/* Logo -  left section */}
        <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          <i className="fas fa-robot text-indigo-600 dark:text-indigo-400 drop-shadow-md"></i>
          <span>ChatBot</span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1 flex-wrap justify-end relative">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-all duration-300 shadow-md"
            >
              Logout
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow"
              >
                Get Started
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      setLogin("login");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setLogin("register");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-lg p-1.5 text-yellow-500 dark:text-yellow-300 hover:scale-110 transition"
            title="Toggle Theme"
          >
            {darkMode ? (
              <i className="fas fa-sun" />
            ) : (
              <i className="fas fa-moon" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
