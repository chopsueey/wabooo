import { useState } from "react";

export function InfoSidebar() {
    const [activeTab, setActiveTab] = useState("Feed");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="user-panel hidden xl:flex xl:fixed right-[max(0px,calc(50%-48rem))] flex-col border-l-2 px-10 pr-36">
      <div
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
        className={(activeTab === "Feed" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Feed")}
      >
        test
      </div>
      <div
        className={(activeTab === "Questions" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Questions")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
      >
        test
      </div>
      <div
        className={(activeTab === "Recommended" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Recommended")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
      >
        test
      </div>

      <div
        className={(activeTab === "AskQuestion" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("AskQuestion")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
      >
        test
      </div>
      <div
        className={(activeTab === "Profile" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Profile")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/profile")}
      >
        test
      </div>
    </div>
  );
}
