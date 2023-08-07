import { useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import { useEffect, useState } from "react";
import { getProfile } from "../fetchRequests/ProfileRequests";
import {
  PlusCircleIcon,
  UserCircleIcon,
  HomeIcon,
  HandThumbUpIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

export default function MobileUserPanel() {
  const navigate = useNavigate();

  const { activeTab, setActiveTab, results } = GeneralStore();

  const [profileId, setProfileId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  useEffect(() => {
    (async function request() {
      // const response = await getTestProfile()
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
    <div className="fixed flex justify-around bottom-0 left-0 w-full px-4 blubb textc sm:hidden">
      <div
        style={{ cursor: "pointer" }}
        className={(activeTab === "Feed" ? "active" : "") + " p-2 font-bold"}
        onClick={() => handleTabClick("Feed")}
      >
        <HomeIcon className="h-6 w-6 mr-2" />
      </div>
      <div
        className={(activeTab === "Trend" ? "active" : "") + " p-2 font-bold"}
        onClick={() => handleTabClick("Trend")}
        style={{ cursor: "pointer" }}
      >
        <FireIcon className="h-6 w-6 mr-2" />
      </div>
      <div
        className={
          (activeTab === "Recommended" ? "active" : "") + " p-2 font-bold"
        }
        onClick={() => handleTabClick("Recommended")}
        style={{ cursor: "pointer" }}
      >
        <HandThumbUpIcon className="h-6 w-6 mr-2" />
      </div>

      <div
        className={`${
          activeTab === "AskQuestion" ? "active" : ""
        } p-2 font-bold flex items-center`}
        onClick={() => handleTabClick("AskQuestion")}
        style={{ cursor: "pointer" }}
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
      </div>
      <div
        className={(activeTab === "Profile" ? "active" : "") + " p-2 font-bold"}
        onClick={() => navigate(`/dashboard/user/profile/${profileId}`)}
        style={{ cursor: "pointer" }}
      >
        <UserCircleIcon className="h-6 w-6 mr-2" />
      </div>
      {/* {results ? (
        <div
          className={
            (activeTab === "Results" ? "active" : "") + " p-2 font-bold"
          }
          style={{ cursor: "pointer" }}
          onClick={() => handleTabClick("Results")}
        >
          search results
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}
