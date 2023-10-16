import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import Smiley from "../assets/smiley.png";
import schrift from "../assets/schrift2.png";
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
        toast.success("Logout successful!", {
            className: "custom-toast",
        });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    useEffect(() => {
		// if (document.cookie.includes("isLoggedIn")) {
		// 	setHasCookie(true);
		// }
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
            <div
                className="flex-grow blubb1 shadow-lg shadow-black mb-10"
                style={{ color: "grey" }}
            >
                <nav
                    className={`bg-opacity-25 row flex flex-col ${
                        isMobileMode ? "bg-opacity-25" : ""
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <div className="w-full flex items-center justify-between mx-2">
                            <div className="flex">
                                <Link
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <img
                                        className="w-30 h-16"
                                        src={Smiley}
                                        alt="wabooo logo"
                                    />
                                </Link>

                                <Link
                                    className="flex items-center ml-1"
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <img
                                        className=" h-10 ml-[-13px] mr-2 "
                                        src={schrift}
                                        alt="wabooo logo"
                                    />
                                </Link>
                            </div>
                            <ul className="hidden sm:flex items-center space-x-4 mr-2">
                                <Link to="/about">
                                    <li className="textc hover:text-cyan-300 text-xl">
                                        About
                                    </li>
                                </Link>
                                <Link to="/contact">
                                    <li className="textc hover:text-cyan-300 text-xl">
                                        Contact
                                    </li>
                                </Link>
                                <span className="w-px h-6 bg-slate-400 mx-4"></span>
                                {hasCookie ? (
                                    <li>
                                        <button
                                            className={`"mt-2 mr-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 ${
                                                logoutLoading
                                                    ? "cursor-not-allowed opacity-75"
                                                    : ""
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
                                                            <circle
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                            />
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
                                        className="cursor-pointer mt-4 mr-2 animate-pulse text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600   shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-4"
                                        onClick={() => setModal(true)}
                                    >
                                        Sign up
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
                            <Link
                                to="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <li className="px-4 py-2 mx-auto w-11/12 textc hover:text-cyan-400">
                                    About
                                </li>
                            </Link>
                            <div className="mx-auto w-11/12 border-b-2 border-gray-500 "></div>

                            <Link
                                to="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <li className="px-4 py-2 mx-auto w-11/12 textc hover:text-cyan-400">
                                    Contact
                                </li>
                            </Link>
                            <div className="mx-auto w-11/12 border-b-2 border-gray-500 mb-2"></div>
                            {hasCookie ? (
                                <li>
                                    {" "}
                                    <div className="flex justify-end mr-5 items-center">
                                        <button
                                            className={`my-2 ml-6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2 ${
                                                logoutLoading
                                                    ? "cursor-not-allowed opacity-75"
                                                    : ""
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
                                                            <circle
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                            />
                                                            <path d="M16 12a4 4 0 1 1-8 0m8 0H8" />
                                                        </svg>
                                                    </div>
                                                    Logging out...
                                                </div>
                                            ) : (
                                                "Logout"
                                            )}
                                        </button>
                                    </div>
                                </li>
                            ) : (
                                <div className="flex justify-end mr-5 items-center">
                                    <span
                                        className="py-1 px-3 text-center text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600  shadow-lg shadow-gray-900 font-medium rounded-lg text-sm ml-2 block max-w-[5rem] mb-1"
                                        onClick={() => setModal(true)}
                                    >
                                        Sign in
                                    </span>
                                </div>
                            )}
                        </ul>
                    )}
                </nav>
            </div>
            <Outlet />
            <Footer />
        </>
    );
}
