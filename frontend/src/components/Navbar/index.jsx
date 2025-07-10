import { useState } from 'react';

/**
 * A responsive navigation bar component with mobile support.
 * 
 * @component
 * @param {Function} onSearchClick - Callback function triggered when the Search button is clicked
 * @param {Function} onInfoCardClick - Callback function triggered when the Last searches button is clicked
 * @returns {JSX.Element} A responsive navigation bar with desktop and mobile views
 * 
 * @example
 * // Basic usage
 * <Navbar 
 *   onSearchClick={() => handleSearchClick()}
 *   onInfoCardClick={() => handleInfoCardClick()}
 * />
 */
const Navbar = ({ onSearchClick, onInfoCardClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('search');

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuItemClick = (handler, item) => {
    if (handler) handler();
    setActiveItem(item);
    setIsMobileMenuOpen(false);
  };
  
  const getButtonClass = (item) => {
    const baseClass = "px-1 pt-1 inline-flex items-center text-sm font-medium hover:cursor-pointer border-b-2 ";
    const activeClass = "text-white border-indigo-500";
    const inactiveClass = "text-gray-300 hover:text-white border-transparent hover:border-gray-300";
    return baseClass + (activeItem === item ? activeClass : inactiveClass);
  };
  
  const getMobileButtonClass = (item) => {
    const baseClass = "block px-3 py-2 rounded-md text-base font-medium w-full text-left ";
    return baseClass + (activeItem === item ? "text-white bg-gray-800" : "text-gray-300 hover:bg-gray-700 hover:text-white");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <button
                onClick={() => {
                  onSearchClick();
                  setActiveItem('search');
                }}
                className={getButtonClass('search')}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
              <button
                onClick={() => {
                  onInfoCardClick();
                  setActiveItem('info');
                }}
                className={getButtonClass('info')}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Last searches
              </button>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={handleMobileMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => handleMobileMenuItemClick(onSearchClick, 'search')}
            className={getMobileButtonClass('search')}
          >
            Search
          </button>
          <button
            onClick={() => handleMobileMenuItemClick(onInfoCardClick, 'info')}
            className={getMobileButtonClass('info')}
          >
            Last searches
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
