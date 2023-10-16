import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../fetchRequests/UserRequests.jsx";
import bg2 from "../assets/end.jpg";
import Typewriter from "typewriter-effect";
import Smiley from "../assets/smiley.png";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";

import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import MyQuestions from "../pages/MyQuestions.jsx";
import FakeMyQuestions from "../pages/FakeMyQuestion.jsx";
import { QuestionChart } from "../chartjs/QuestionChart.jsx";

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
  const [testAccount, setTestAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState(false);

  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doubleCheckPassword, setDoubleCheckPassword] = useState("");

  const [isContentVisible, setIsContentVisible] = useState({
    question1: false,
    question2: false,
    question3: false,
  });

  const handleQuestionClick = (questionKey) => {
    setIsContentVisible((prevState) => ({
      ...prevState,
      [questionKey]: !prevState[questionKey],
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (testAccount) {
      setTestAccount(false);
      setLoading(true);
      const data = { email, password };
      setEmail("");
      setPassword("");
      console.log(data);
      setRegister(false);
      const testAccResponse = await userLogin(data);

      if (testAccResponse.status === 200) {
        setHasCookie(true);
        setModal(false);
        navigate("/dashboard");
        toast.success("Login successful!", {
          className: "custom-toast",
        });
        setLoading(false);
        return;
      }
      return;
    }

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
        sessionStorage.setItem("isLoggedIn", "true");
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
    <div
      className="flex flex-col overflow-hidden "
      style={{ minHeight: "100vh" }}
    >
      {/* <h1 className="text-4xl textc">Welcome to Wabooo!</h1> */}
      <div className="h-screen">
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
        {/* karten */}
        <div
          className="flex flex-wrap justify-center gap-4 sm:mb-8"
          style={{ marginBottom: "5rem" }}
        >
          {/* Card eins */}
          <div className="mx-4 blubb rounded-xl shadow-lg shadow-black overflow-hidden w-[500px]">
            {/* <div
              className="w-full h-1/2"
              style={{
                backgroundImage: `url(${bg2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }}
              // src="https://dummyimage.com/150%20x%20150/1f2937/06b5d4.jpg&text=+Wabooo"
            /> */}
            <img src={bg2} alt="" />
            {/* <div className="py-4 px-6 flex flex-col justify-center">
              <h2 className="text-cyan-300 mt-8 text-xl text-center font-semibold">
                You have a question?
              </h2>
              <p className="mt-2 text-cyan-500 text-center">Ask Wabooo!</p>
            </div> */}
          </div>
        </div>
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
            {/* test acc */}
            <button
              className={` mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2 ${
                loading ? "cursor-not-allowed opacity-75" : ""
              }`}
              onClick={() => {
                setEmail("testAccount@gmail.com");
                setPassword("123456Test!");
                setTestAccount(true);
              }}
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
                "Test account"
              ) : (
                "Test account"
              )}
            </button>
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
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={password}
                placeholder="password (minimum 8 characters)"
                onChange={(evt) => setPassword(evt.target.value)}
              />
              {password.length >= 1 &&
                !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) && (
                  <p className="text-red-700 mt-2">
                    Password shall have minimum 8 characters, including at least
                    one capital letter and a symbol
                  </p>
                )}
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
              className={` mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2 ${
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
                {/* <ArrowLongLeftIcon className="h-5 w-5 text-cyan-300" /> */}
                <span
                  className="cursor-pointer"
                  onClick={() => setRegister(false)}
                >
                  to sign in
                </span>
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
<div style={{minHeight: "50vh"}} className="mb-20">
<section  className="flex flex-col justify-center items-center p-2 mt-16">
        <h2 className="text-white  text-center text-5xl lg:text-7xl mb-10 font-bold ">
          <span className="text-cyan-400">Wabooo</span> asking us?
        </h2>
        <h2 className="blubb rounded-xl shadow-lg shadow-black text-white text-center text-xl mb-10 font-bold py-10 mt-20 px-10 sm:px-20 w-fit mx-2 sm:mx-10 max-w-[800px]">
          Wabooo is a social media app, on which you can create questions for
          other users, that can only be answered with yes or no.
          <br/>
          So <span className="italic text-cyan-400">what about</span> asking us?
        </h2>
      </section>
      <section className="container mx-auto flex flex-col lg:flex-row justify-center items-center pt-3 pb-3 w-full mt-10">
          <div className="overflow-hidden sm:w-1/2 flex justify-center items-center p-10">
            <p className="text-center sm:text-3xl">
              {" "}
              You can ask questions to other users and add certain topics to
              them, so that they are easier to find.
              {/* Pose your inquiries, articulate your viewpoints, comment
              thoughtfully, and embrace openness. By embracing diverse
              perspectives, we can collaboratively uncover more effective
              solutions for individuals and the collective. Join in now! */}
            </p>
          </div>

          <div className="sm:w-1/2 overflow-hidden p-4">
            <FakeMyQuestions />
          </div>
        </section>
</div>
      
      <div className="flex flex-col space-y-4">
        
        <div className="border border-b border-cyan-300 mx-10"></div>
        <section className="container mx-auto flex flex-col lg:flex-row justify-center items-center pt-3 pb-3 w-full px-2">
          <div className="w-full flex justify-center my-10 sm:w-1/2">
            {/* <img src={age} alt="chart" className="" /> */}
            <QuestionChart
              type="line"
              questionId={"64b6797445d37eb3c6530e0a"}
            />
          </div>
          <div className="overflow-hidden sm:w-1/2 flex justify-center items-center p-10">
            <p className="text-center sm:text-3xl">
              {" "}
              {/* Do you possess strong convictions regarding matters of importance,
              both to yourself and to society at large? Are you eager to
              cultivate awareness about specific issues? Do you aspire to
              enhance your sociability by comprehending the viewpoints of both
              the majority and minority populations in your country, region, and
              across the globe? This is the platform that empowers you to
              achieve all these aspirations and more! Engage in questioning,
              sharing, agreeing, and dissenting. */}
              {/* This chart provides an overview of the average age of the
              participants in relation to the aforementioned question. */}
              You will also get an overview of the average age of all users
              who answered your question.
            </p>
          </div>
        </section>
        {/* <div className="border border-b border-cyan-300 mr-10 ml-10"></div> */}
        <section className="container mx-auto flex flex-col lg:flex-row justify-center items-center pt-3 pb-3 w-full px-2">
          <div className="overflow-hidden sm:w-1/2 flex justify-center items-center p-10">
            <p className="text-center sm:text-3xl">
              This pie chart visually represents the distribution of
              participants based on their respective countries.
            </p>
          </div>
          <div className="w-full flex justify-center my-10 sm:w-1/2">
            <QuestionChart
              type="doughnut"
              questionId={"64b6797445d37eb3c6530e0a"}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
