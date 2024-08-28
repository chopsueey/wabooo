import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyQuestions from "./pages/MyQuestions";
import Logout from "./pages/Logout";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import OthersProfile from "./pages/OthersProfile";
import { QuestionPage } from "./pages/QuestionPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
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
          <Route path="dashboard/myquestions" element={<MyQuestions />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
