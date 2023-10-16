import { Routes, Route, useNavigate, HashRouter } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyQuestions from "./pages/MyQuestions";
import Logout from "./pages/Logout";
import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound";
import GeneralStore from "./store/GeneralContext";
import OthersProfile from "./pages/OthersProfile";
import { QuestionPage } from "./pages/QuestionPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const navigate = useNavigate();
    // cookie check for sensitive websitedata?
    const { hasCookie, setHasCookie } = GeneralStore();
    // const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(document.cookie.includes("isLoggedIn"));
        console.log(document.cookie);

        if (document.cookie.includes("isLoggedIn")) {
            setHasCookie(true);
        }

        console.log("Logged in?", hasCookie);
    });

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    {/* <Route path="dashboard/search" element={<Dashboard />} /> */}
                    <Route
                        path="dashboard/user/profile/:profileId"
                        element={<Profile />}
                    />
                    <Route
                        path="dashboard/:userName/profile/:profileId"
                        element={<OthersProfile />}
                    />
                    <Route
                        path="dashboard/question/:userName/:questionId"
                        element={<QuestionPage />}
                    />
                    <Route
                        path="dashboard/myquestions"
                        element={<MyQuestions />}
                    />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default App;
