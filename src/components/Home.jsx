import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../fetchRequests/UserRequests.jsx";
import bg from "../assets/akin-cakiner-unsplash.jpg";
// import bg2 from "../assets/OIG.LoWKTxfaR4d77t.jpeg"
import GeneralStore from "../store/GeneralContext";

export default function Home() {
  const navigate = useNavigate();
  const { modal, setModal, hasCookie, setHasCookie } = GeneralStore();
  const [loading, setLoading] = useState(false);

  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doubleCheckPassword, setDoubleCheckPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (register && doubleCheckPassword !== password)
      return console.log("Your passwords are not equal.");
    const data = { name, userName, email, password };
    console.log(data);
    setRegister(false);
    setName("");
    setEmail("");
    setPassword("");
    if (!register) {
      setLoading(true);
      const loginAttempt = await userLogin(data);
      if (loginAttempt) {
        setHasCookie(true);
        setModal(false);
        navigate("/dashboard");
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    await userRegister(data);
    setLoading(false);
    setModal(false);
  };

  useEffect(() => {
    if (hasCookie) navigate("/dashboard");
  });

  return (
    <div className="wrapper" style={{ height: "100vh" }}>
      <div
        className="flex flex-col justify-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      >
        <h1 className="text-4xl textc">Welcome to Wabooo!</h1>

        {modal && (
          <div className="modal">
            <form className="signin flex flex-col p-4 text-center bg-gray-800 rounded-lg max-w-md mx-auto">
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
                  value={password}
                  placeholder="password"
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
                className={` mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2 ${
                  loading ? "cursor-not-allowed opacity-75" : ""
                }`}
                onClick={handleSubmit}
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
                    className="mt-4 text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2"
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
      </div>
    </div>
  );
}
