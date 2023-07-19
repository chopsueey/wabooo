import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import logo from "../assets/Logo123.png";
import { userLogout } from "../fetchRequests/UserRequests";
import Footer from "./Footer";
import MobileUserPanel from "./MobileUserPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navigation() {
  const navigate = useNavigate();
  const { setModal, hasCookie, setHasCookie } = GeneralStore();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await userLogout();
    setLogoutLoading(false);
    setHasCookie(false);
    navigate("/logout");
    toast.success("Logout successful!");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileMode(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex-grow" style={{ color: "grey" }}>
        <nav
          className={`bg-opacity-0 row flex flex-col ${
            isMobileMode ? "bg-opacity-0" : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img className="w-30 h-16 mr-2" src={logo} alt="wabooo logo" />
              </Link>
              <ul className="hidden sm:flex items-center space-x-4">
                <Link to="/about">
                  <li className="text-cyan-700 hover:text-cyan-300 text-xl">
                    About
                  </li>
                </Link>
                <Link to="/contact">
                  <li className="text-cyan-700 hover:text-cyan-300 text-xl">
                    Contact
                  </li>
                </Link>
                {hasCookie || document.cookie.includes("isLoggedIn") ? (
                  <li>
                    <button
                      className={`"mt-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 ${
                        logoutLoading ? "cursor-not-allowed opacity-75" : ""
                      }`}
                      onClick={handleLogout}
                      disabled={logoutLoading}
                    >
                      {logoutLoading ? (
                        <div className="flex  justify-end items-center">
                          <div className="mr-2 animate-spin">
                            <svg
                              className="w-5 h-5 text-cyan-700"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M16 12a4 4 0 1 1-8 0m8 0H8" />
                            </svg>
                          </div>
                          Logging out...
                        </div>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </li>
                ) : (
                  <span
                    className="mt-4 mr-2 text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2"
                    onClick={() => setModal(true)}
                  >
                    Sign in
                  </span>
                )}
              </ul>
            </div>

            <div className="flex items-center">
              <div
                className="block sm:hidden ml-4 mr-4"
                onClick={toggleMobileMenu}
                style={{ cursor: "pointer" }}
              >
                <svg
                  className="w-6 h-6 text-cyan-700 hover:text-cyan-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <ul className="block sm:hidden textc hover:text-gray-800 mt-2 mb-2">
              <div className="mx-auto w-11/12 border-b-2 border-gray-500 "></div>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                <li className="px-4 py-2 mx-auto w-11/12 textc hover:text-cyan-400">
                  About
                </li>
              </Link>
              <div className="mx-auto w-11/12 border-b-2 border-gray-500 "></div>

              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <li className="px-4 py-2 mx-auto w-11/12 textc hover:text-cyan-400">
                  Contact
                </li>
              </Link>
              <div className="mx-auto w-11/12 border-b-2 border-gray-500 mb-2"></div>
              {hasCookie || document.cookie.includes("isLoggedIn") ? (
                <li>
                  <button
                    className={`mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2 ${
                      logoutLoading ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    onClick={handleLogout}
                    disabled={logoutLoading}
                  >
                    {logoutLoading ? (
                      <div className="flex items-center">
                        <div className="mr-2 animate-spin">
                          <svg
                            className="w-5 h-5 text-cyan-700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M16 12a4 4 0 1 1-8 0m8 0H8" />
                          </svg>
                        </div>
                        Logging out...
                      </div>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </li>
              ) : (
                <span
                  className="py-1 px-3 text-center text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-900 font-medium rounded-lg text-sm ml-2 block max-w-[5rem] mb-1"
                  onClick={() => setModal(true)}
                >
                  Sign in
                </span>
              )}
            </ul>
          )}
        </nav>
      </div>
      <Outlet />
      <MobileUserPanel />
      <Footer />
      <ToastContainer />
    </>
  );
}
