// import { useState, useEffect } from 'react';
import "../../App.css";
import InfoCard from "../../components/InfoCard";
import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
// import { set, useForm } from 'react-hook-form';

const Home = () => {
  const dataServices = {
    title: "Services",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };

  const dataAbout = {
    title: "About Us",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };
  const dataContact = {
    title: "Contact",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        {/* <nav className="bg-gray-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a
                  href="#"
                  className="flex-shrink-0 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindflex.com/images/logo.svg"
                    alt="Logo"
                  />
                  <span className="ml-2 text-xl font-bold">Navbar</span>
                </a>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <a
                    href="#"
                    className="text-white border-b-2 border-indigo-500 px-1 pt-1 inline-flex items-center text-sm font-medium">
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium">
                    Team
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium">
                    Projects
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium">
                    Calendar
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:flex md:ml-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                      placeholder="Search..."
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

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
          <div
            className="md:hidden hidden"
            id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Team
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Projects
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Calendar
              </a>
            </div>

            <div className="px-2 pt-2 pb-3">
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-800 text-white w-full rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

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
                  <div className="text-base font-medium text-white">
                    Tom Cook
                  </div>
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
        </nav> */}

        <div className="container mx-auto pt-12 pb-20">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Welcome to my website
          </h1>

          <SearchForm />
          {/* <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
            <input
              placeholder="e.g. Blog"
              className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
              type="text"
              name="query"
              id="query"
            />
            <button
              type="submit"
              className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <svg
                className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Search
            </button>
          </div> */}

          <p className="text-gray-700 text-lg text-center mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit
            amet magna id ex hendrerit semper.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              title={dataServices.title}
              content={dataServices.content}
            />
            <InfoCard
              title={dataAbout.title}
              content={dataAbout.content}
            />
            <InfoCard
              title={dataContact.title}
              content={dataContact.content}
            />
            {/* <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Services</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sit amet magna id ex hendrerit semper.
              </p>
            </div> */}
            {/* <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About Us</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sit amet magna id ex hendrerit semper.
              </p>
            </div> */}
            {/* <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sit amet magna id ex hendrerit semper.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      {/* <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
        
        // User menu toggle
        document.getElementById('user-menu-button')?.addEventListener('click', function() {
            const userMenu = document.getElementById('user-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            userMenu.classList.toggle('hidden');
        });
    </script> */}
    </>
  );
};

export default Home;
