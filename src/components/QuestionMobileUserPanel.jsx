import { useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import { useEffect, useState } from "react";
import { getProfile } from "../fetchRequests/ProfileRequests";
import {
  ChatBubbleBottomCenterTextIcon,
  HomeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function QuestionMobileUserPanel({ activeTab2, setActiveTab2 }) {
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
    setActiveTab2(tab);
  };

  return (
    <div className="fixed flex justify-around bottom-0 left-0 w-full px-4 blubb textc sm:hidden">
      <div
        style={{ cursor: "pointer" }}
        className={
          (activeTab2 === "Dashboard" ? "active" : "") + " p-2 font-bold"
        }
        onClick={() => {navigate(`/dashboard/`)
      setActiveTab("Feed")}}
      >
        <HomeIcon className="h-6 w-6" />
      </div>
      <div
        className={
          (activeTab2 === "Statistics" ? "active" : "") + " p-2 font-bold"
        }
        onClick={() => handleTabClick("Statistics")}
        style={{ cursor: "pointer" }}
      >
        <ChartBarIcon className="h-6 w-6" />
      </div>
      <div
        className={
          (activeTab2 === "Comments" ? "active" : "") + " p-2 font-bold"
        }
        onClick={() => handleTabClick("Comments")}
        style={{ cursor: "pointer" }}
      >
        <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
      </div>
      {/* <div
        className={(activeTab === "Profile" ? "active" : "") + " p-2 font-bold"}
        onClick={() => handleTabClick("Profile")}
        style={{ cursor: "pointer" }}
      >
        <UserCircleIcon className="h-6 w-6" />
      </div>
      <div
        className={
          (activeTab === "Questions" ? "active" : "") + " p-2 font-bold"
        }
        onClick={() => handleTabClick("Questions")}
        style={{ cursor: "pointer" }}
      >
        <MegaphoneIcon className="h-6 w-6" />
      </div>
      <div
        className={
          (activeTab === "Follower" ? "active" : "") + " p-2 font-bold"
        }
        onClick={() => handleTabClick("Follower")}
        style={{ cursor: "pointer" }}
      >
        <UserGroupIcon className="h-6 w-6" />
      </div>

      <div
        className={`${
          activeTab === "Following" ? "active" : ""
        } p-2 font-bold flex items-center`}
        onClick={() => handleTabClick("Following")}
        style={{ cursor: "pointer" }}
      >
        <UsersIcon className="h-6 w-6" />
      </div> */}

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
