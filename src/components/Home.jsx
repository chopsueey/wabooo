import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../fetchRequests/UserRequests.jsx";
import bg from "../assets/background.jpg";
import bg2 from "../assets/karte.jpg";
import gifIcon from "../assets/4dg1.gif";
import ask from "../assets/ask.mp4";
import GeneralStore from "../store/GeneralContext";
import Typewriter from "typewriter-effect";
import Smiley from "../assets/Smiley.png";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
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
      toast.error("Your passwords do not match.", {
        className: "custom-toast",
      });
      return;
    }
    if (register && !name && !userName) {
      toast.error("Please, provide your name and username", {
        className: "custom-toast",
      });
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
        toast.success("Login successful!", {
          className: "custom-toast",
        });
        setLoading(false);
        return;
      } else if (response.status === 400) {
        toast.error("Your password is incorrect.", {
          className: "custom-toast",
        });
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
      toast.success("Your account is created. You can login now.", {
        className: "custom-toast",
      });
      return;
    }
    if (!password) {
      toast.error("Please, provide your password", {
        className: "custom-toast",
      });
      return;
    } else if (response.status === 400) {
      toast.error("Please, check your entries.", {
        className: "custom-toast",
      });
    }
    setLoading(false);
    setModal(false);
    return;
  };

  useEffect(() => {
    if (hasCookie) navigate("/dashboard");
  });
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex flex-col " style={{ height: "100vh" }}>
      {/* <h1 className="text-4xl textc">Welcome to Wabooo!</h1> */}

      {/* text effekt */}
      <div className="flex flex-col items-center justify-center h-2/4">
        <h1 className="text-center pb-10 text-white text-5xl lg:text-7xl">
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
            className="signin blubb absolute flex flex-col p-4 text-center bg-gray-800 rounded-lg max-w-md mx-auto top-2/4 left-2/4 w-[270px] sm:w-[400px]"
            onSubmit={handleSubmit}
          >
            {" "}
            <span
              className="textc font-bold flex items-end justify-end"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setModal(false);
                setRegister(false);
              }}
            >
              <XMarkIcon className="h-5 w-5 text-cyan-300" />
            </span>
            <div className="flex items-center justify-center">
              <img src={Smiley} alt="" className="w-2/3 h-2/3 " />
            </div>
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
              className={` mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2 ${
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
        <div className="mx-4 blubb shadow-md rounded-lg overflow-hidden h-[300px]  w-[300px]">
          <div
            className="w-full h-2/4 object-cover"
            style={{
              backgroundImage: `url(${bg2})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            // src="https://dummyimage.com/150%20x%20150/1f2937/06b5d4.jpg&text=+Wabooo"
          />
          <div className="py-4 px-6">
            <h2 className="text-cyan-300 mt-8 text-xl text-center font-semibold">
              You have a question?
            </h2>
            <p className="mt-2 text-cyan-500 text-center">Ask Wabooo!</p>
          </div>
        </div>

        {/* Card zwei */}
        {/* <div className=" mx-4 blubb shadow-md rounded-lg overflow-hidden">
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
        {/* <div className=" mx-4 blubb shadow-md rounded-lg overflow-hidden">
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
          </div>  */}
      </div>
      <section className="flex justify-center items center w-full max-w-sm p-8 blubb1 rounded-md shadow-md gap-4 mt-8">
        <div className="flex flex-col items-center">
          <img src={gifIcon} alt="Questions icon" />

          <p className="mt-2 text-cyan-500 text-center">
            Hier Kann Marius einen tollen text schreiben
          </p>
        </div>
        <div>
          {/* <video autoPlay loop muted>
            <source src={ask} type="video/mp4" />
            
          </video> */}
        </div>
      </section>
      {/* <section className="flex justify-center gap-4 mt-8 blubb">
        <div
          className="flex flex-col items-center "
          data-aos="fade-up"
          data-aos-delay="3000"
        >
          <svg
            className="h-8 w-8 text-cyan-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-2.293-3.293a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414zm4.586 0a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414z"
              clipRule="evenodd"
            />
          </svg>

          <p className="mt-2 text-cyan-500 text-center">
            Hier Kann Marius einen tollen text schreiben
          </p>
        </div>
      </section>
      <section className="flex justify-center gap-4  mt-8 blubb1">
        <div
          className="flex flex-col items-center "
          data-aos="fade-up"
          data-aos-delay="3000"
        >
          <svg
            className="h-8 w-8 text-cyan-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-2.293-3.293a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414zm4.586 0a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414z"
              clipRule="evenodd"
            />
          </svg>

          <p className="mt-2 text-cyan-500 text-center">
            Hier Kann Marius einen tollen text schreiben
          </p>
        </div>
      </section> */}
    </div>
  );
}
