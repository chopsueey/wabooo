import { useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import { useEffect, useState } from "react";
import { getProfile } from "../fetchRequests/ProfileRequests";

export default function UserPanel() {
  const { activeTab, setActiveTab, results } = GeneralStore();

  const navigate = useNavigate();

  const [profileId, setProfileId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [userPanelClassName, setUserPanelClassName] = useState(
    "hidden sm:block lg:fixed lg:w-1/4 xl:w-auto sm:px-6 lg:px-10"
  );

  // set user panel fixed when scrollY above 170px
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 175) {
      setUserPanelClassName(
        "hidden sm:block lg:fixed top-0 lg:w-1/4 xl:w-auto sm:px-6 lg:px-10"
      );
    } else {
      setUserPanelClassName(
        "hidden sm:block lg:absolute lg:w-1/4 xl:w-auto sm:px-6 lg:px-10"
      );
    }
  });

  useEffect(() => {
    (async function request() {
      const response = await getProfile();
      console.log(response);
      setProfileId(response.userProfile._id);
      setUserName(response.userProfile.userName);
    })();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div  className={userPanelClassName + " z-10"}>
      <div style={{maxWidth: "200px"}} className="user-panel flex lg:flex-col mt-10">
        <div
          style={{ cursor: "pointer" }}
          className={
            (activeTab === "Feed" ? "active" : "") +
            " p-2  hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-cyan-700 hover:text-cyan-300 text-xl"
          }
          onClick={() => handleTabClick("Feed")}
        >
          feed
        </div>
        <div
          className={
            (activeTab === "Trend" ? "active" : "") +
            " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-cyan-700 hover:text-cyan-300 text-xl"
          }
          onClick={() => handleTabClick("Trend")}
          style={{ cursor: "pointer" }}
        >
          trend
        </div>
        <div
          className={
            (activeTab === "Recommended" ? "active" : "") +
            " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-cyan-700 hover:text-cyan-300 text-xl"
          }
          onClick={() => handleTabClick("Recommended")}
          style={{ cursor: "pointer" }}
        >
          recommended
        </div>

        <div
          className={
            (activeTab === "AskQuestion" ? "active" : "") +
            " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-cyan-700 hover:text-cyan-300 text-xl"
          }
          onClick={() => handleTabClick("AskQuestion")}
          style={{ cursor: "pointer" }}
        >
          ask a question
        </div>
        <div
          className={
            (activeTab === "Profile" ? "active" : "") +
            " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-cyan-700 hover:text-cyan-300 text-xl"
          }
          // onClick={() => handleTabClick("Profile")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/dashboard/user/profile/${profileId}`)}
        >
          profile
        </div>
        {results ? (
          <div
            className={
              (activeTab === "Results" ? "active" : "") +
              " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-cyan-700 hover:text-cyan-300 text-xl"
            }
            style={{ cursor: "pointer" }}
            onClick={() => handleTabClick("Results")}
          >
            search results
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
