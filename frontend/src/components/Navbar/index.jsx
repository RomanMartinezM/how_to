/**
 * A responsive navigation bar component with mobile support.
 * 
 * @component
 * @param {Function} onSearchClick - Callback function triggered when the Search button is clicked
 * @param {Function} onInfoCardClick - Callback function triggered when the Last searches button is clicked
 * @param {Function} onAnalyticsClick - Callback function triggered when the Analytics button is clicked
 * @returns {JSX.Element} A responsive navigation bar with desktop and mobile views
 * 
 * @example
 * // Basic usage
 * <Navbar 
 *   onSearchClick={() => handleSearchClick()}
 *   onInfoCardClick={() => handleInfoCardClick()}
 *   onAnalyticsClick={() => handleAnalyticsClick()}
 * />
 */
const Navbar = ({ onSearchClick, onInfoCardClick, onAnalyticsClick }) => {
  return (
    <>
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <button
                  onClick={onSearchClick}
                  className="text-white border-b-2 border-indigo-500 px-1 pt-1 inline-flex items-center text-sm font-medium hover:cursor-pointer"
                >
                  Search
                </button>
                <button
                  onClick={onInfoCardClick}
                  className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium">
                  Last searches
                </button>
                <button
                onClick={onAnalyticsClick}
                  className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium">
                  Analytics
                </button>
              </div>
            </div>
            <div className="flex items-center">
              {/* <!-- Profile dropdown --> */}
              <div className="ml-3 relative hidden md:block">
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                {/* <!-- Dropdown menu, show/hide based on menu state --> */}
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
                  id="user-menu"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1">
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1">
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1">
                    Sign out
                  </a>
                </div>
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="flex items-center md:hidden ml-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-expanded="false"
                  id="mobile-menu-button">
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
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
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state --> */}
        <div
          className="md:hidden hidden"
          id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={onSearchClick}
              className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium hover:cursor-pointer w-full text-left"
            >
              Search
            </button>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Last searches
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Analytics
            </a>
          </div>

          {/* <!-- Mobile profile --> */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">Tom Cook</div>
                <div className="text-sm font-medium text-gray-400">
                  tom@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                Your Profile
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                Settings
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
