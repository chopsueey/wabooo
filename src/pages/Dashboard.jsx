import Trend from "../components/Trend.jsx";
import UserPanel from "../components/UserPanel.jsx";
import Feed from "../components/Feed.jsx";
import MyQuestions from "./MyQuestions.jsx";
import { InfoSidebar } from "../components/InfoSidebar.jsx";
import GeneralStore from "../store/GeneralContext.jsx";
import Recommended from "../components/Recommended.jsx";

import { Searchbar } from "../components/Searchbar.jsx";
import SearchResults from "../components/SearchResults.jsx";

export default function Dashboard() {
  const { activeTab, results } = GeneralStore();

  return (
    <div className="mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <section
        className="row bg-gray-500  bg-opacity-25 rounded-xl h-[5rem] shadow-lg shadow-gray-900"
        // style={{
        //   backgroundColor: "#23272f",
        //   color: "white",
        //   borderBottom: "solid 3px #149eca",
        // }}
      >
        <Searchbar />
      </section>
      {/* content of dashboard page */}
      <div className="m-5"></div>
      <section
        className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950"
        // style={{
        //   backgroundColor: "#23272f",
        //   color: "white",
        // }}
      >
        <UserPanel />
        <div
          style={{ minHeight: "100vh" }}
          className="grow px-2 sm:px-6 lg:px-10 lg:pl-[15rem] xl:pr-[20rem] mb-5 mt-5 relative" // xl:px-[17rem]
        >
          {activeTab === "Feed" ? <Feed /> : ""}

          {activeTab === "Trend" ? <Trend /> : ""}

          {activeTab === "Recommended" ? <Recommended /> : ""}

          {activeTab === "AskQuestion" ? <MyQuestions /> : ""}
          {results ? <SearchResults /> : ""}
          <InfoSidebar />
        </div>
      </section>
    </div>
  );
}
