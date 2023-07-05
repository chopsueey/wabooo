import { Routes, Route, useNavigate } from "react-router-dom";
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

function App() {
  const navigate = useNavigate();
  // cookie check for sensitive websitedata?
  const { hasCookie, setHasCookie } = GeneralStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // using IIFE here
    document.cookie.includes("isLoggedIn")
      ? (() => {
          setHasCookie(true);
          setIsLoading(false);
        })()
      : (() => {
          setIsLoading(false);
        })();
    console.log("Logged in?", hasCookie);
  }, [hasCookie]);

  return (
    <div className="max-w-screen-2xl mx-auto">
      {isLoading ? (
        <h2 style={{ color: "white" }}>Loading...</h2>
      ) : (
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/user/:profileId" element={<Profile />} />
            <Route path="dashboard/:userName/:profileId" element={<OthersProfile />} />
            <Route path="dashboard/question/:userName/:questionId" element={<QuestionPage />} />
            <Route path="dashboard/myquestions" element={<MyQuestions />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
