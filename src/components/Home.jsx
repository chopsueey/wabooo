import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../fetchRequests/UserRequests.jsx";
import bg from "../assets/background.jpg";
import bg2 from "../assets/karte.jpg";
import bg3 from "../assets/karte2.jpg";
import bg4 from "../assets/karte3.jpg";
import GeneralStore from "../store/GeneralContext";

import Typewriter from "typewriter-effect";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//"Your account is created. You are logged in!";
// Account not yet created")
// your name shall be minimum 2 letters
// email shall have a proper format
// your password shall be minimum 8 letters, including numbers and symbols
//"Your passwords do not match.");
//"You are logged in!");
//"Your password is incorrect."

export default function Home() {
  const navigate = useNavigate();
  const { modal, setModal, hasCookie, setHasCookie } = GeneralStore();
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState(false);

  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doubleCheckPassword, setDoubleCheckPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (register && doubleCheckPassword !== password) {
      toast.error("Your passwords do not match.");
      return;
    }
    if (register && !name && !userName) {
      toast.error("Please, provide your name and username");
      return;
    }
    const data = { name, userName, email, password };
    console.log(data);
    setRegister(false);
    setName("");
    setEmail("");
    setPassword("");
    if (!register) {
      setLoading(true);
      const response = await userLogin(data);
      if (response.status === 200) {
        setHasCookie(true);
        setModal(false);
        navigate("/dashboard");
        toast.success("Login successful!");
        setLoading(false);
        return;
      } else if (response.status === 400) {
        toast.error("Your password is incorrect.");
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    const { response } = await userRegister(data);
    console.log(response);
    if (response.status === 201) {
      setRegister(false);
      setLoading(false);
      toast.success("Your account is created. You can login now.");
      return;
    }
    if (!password) {
      toast.error("Please, provide your password");
      return;
    } else if (response.status === 400) {
      toast.error("Please, check your entries.");
    }
    setLoading(false);
    setModal(false);
    return;
  };

  useEffect(() => {
    if (hasCookie) navigate("/dashboard");
  });

  return (
    <div className="wrapper" style={{ height: "115vh" }}>
      <div
      // className="flex flex-col justify-center"
      // style={{
      //   backgroundImage: `url(${bg})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   width: "100%",
      //   height: "100%",
      // }}
      >
        {/* <h1 className="text-4xl textc">Welcome to Wabooo!</h1> */}

        {/* text effekt */}
        <div className="flex flex-col items-center justify-center h-2/4">
          <h1 className="text-center pb-10  text-white text-5xl">
            <Typewriter
              options={{
                strings: [
                  "How many other people think like you?",
                  "Sign up and find out!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </div>

        {modal && (
          <div
            style={{ transform: `translate(-50%, -50%)` }}
            className="modal absolute left-2/4 top-2/4 overlay"
          >
            <form
              style={{ transform: `translate(-50%, -50%)` }}
              className="signin absolute flex flex-col p-4 text-center bg-gray-800 rounded-lg max-w-md mx-auto top-2/4 left-2/4 w-[270px] sm:w-[400px]"
              onSubmit={handleSubmit}
            >
              <span
                className="textc font-bold"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModal(false);
                  setRegister(false);
                }}
              >
                Close
              </span>
              <h3 className="text-white">
                {register ? "Sign up" : "Log into your account!"}
              </h3>
              {register && (
                <>
                  <label className="block text-white text-xs font-bold mb-2">
                    <input
                      className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                      type="text"
                      value={name}
                      placeholder="name"
                      onChange={(evt) => setName(evt.target.value)}
                    />
                  </label>
                  <label className="block text-white text-xs font-bold mb-2">
                    <input
                      className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                      type="text"
                      value={userName}
                      placeholder="username"
                      onChange={(evt) => setUserName(evt.target.value)}
                    />
                  </label>
                </>
              )}
              <label className="block text-white text-xs font-bold mb-2">
                <input
                  className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                  type="email"
                  value={email}
                  placeholder="email"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </label>
              <label className="block text-white text-xs font-bold mb-2">
                <input
                  className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                  type="password"
                  minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={password}
                  placeholder="password (minimum 8 characters)"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </label>
              {register && (
                <label className="block text-white text-xs font-bold mb-2">
                  <input
                    className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                    type="password"
                    value={doubleCheckPassword}
                    placeholder="confirm password"
                    onChange={(evt) => setDoubleCheckPassword(evt.target.value)}
                  />
                </label>
              )}
              <button
                className={` mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2 ${
                  loading ? "cursor-not-allowed opacity-75" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="mr-2 animate-spin">
                      <svg
                        className="w-5 h-5 text-white"
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
                    Signing in...
                  </div>
                ) : register ? (
                  "Create account"
                ) : (
                  "Sign in"
                )}
              </button>
              {register ? (
                <p className="register">
                  <span onClick={() => setRegister(false)}>To sign in</span>
                </p>
              ) : (
                <p className="register mb-4">
                  <span
                    className="mt-4 text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-800font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => setRegister(true)}
                  >
                    Register
                  </span>
                </p>
              )}
            </form>
          </div>
        )}
        {/* karten */}
        <div
          className="flex flex-wrap justify-center gap-4 sm:mb-8"
          style={{ marginBottom: "5rem" }}
        >
          {/* Card eins */}
          <div className="mx-4 blubb shadow-md rounded-lg overflow-hidden">
            <div
              className="w-full h-32 object-cover"
              style={{
                backgroundImage: `url(${bg2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
              // src="https://dummyimage.com/150%20x%20150/1f2937/06b5d4.jpg&text=+Wabooo"
            />
            <div className="py-4 px-6">
              <h2 className="text-cyan-300 text-xl font-semibold">
                You have a question?
              </h2>
              <p className="mt-2 text-cyan-500">Ask Wabooo!</p>
            </div>
          </div>

          {/* Card zwei */}
          <div className=" mx-4 blubb shadow-md rounded-lg overflow-hidden">
            <div
              className="w-full h-32 object-cover"
              style={{
                backgroundImage: `url(${bg3})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
              // src="https://dummyimage.com/150%20x%20150/1f2937/06b5d4.jpg&text=+Wabooo"
            />
            <div className="py-4 px-6">
              <h2 className="text-cyan-300 text-xl font-semibold">
                You have a question?
              </h2>
              <p className="mt-2 text-cyan-500">Ask Wabooo!</p>
            </div>
          </div>

          {/* Card drei */}
          <div className=" mx-4 blubb shadow-md rounded-lg overflow-hidden">
            <div
              className="w-full h-32 object-cover"
              style={{
                backgroundImage: `url(${bg4})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
              // src="https://dummyimage.com/150%20x%20150/1f2937/06b5d4.jpg&text=+Wabooo"
            />
            <div className="py-4 px-6">
              <h2 className="text-cyan-300 text-xl font-semibold">
                You have a question?
              </h2>
              <p className="mt-2 text-cyan-500">Ask Wabooo!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
