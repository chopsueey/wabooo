import { useState } from "react";

export function InfoSidebar() {
  const [activeTab, setActiveTab] = useState("Feed");
  const [infoSidebarClassName, setInfoSidebarClassName] = useState(
    "hidden xl:flex xl:absolute top-0 right-[max(0px,calc(50%-48rem))] flex-col mt-5"
  );

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 175) {
      setInfoSidebarClassName(
        "hidden xl:flex xl:fixed top-[1.4rem] right-[max(0px,calc(50%-48rem))] flex-col pr-[7rem] mt-5"
      );
    } else {
      setInfoSidebarClassName(
        "hidden xl:flex xl:absolute top-0 right-[max(0px,calc(50%-48rem))] flex-col mt-5"
      );
    }
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className={infoSidebarClassName}>
      <div className="pr-10">
      <div className="border-r-2">
      <div
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
        className={(activeTab === "Feed" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Feed")}
      >
        additional container
      </div>
      <div
        className={(activeTab === "Questions" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Questions")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
      >
        Was
      </div>
      <div
        className={(activeTab === "Recommended" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Recommended")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
      >
        soll
      </div>

      <div
        className={(activeTab === "AskQuestion" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("AskQuestion")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/myquestions")}
      >
        hier
      </div>
      <div
        className={(activeTab === "Profile" ? "active" : "") + " p-2"}
        onClick={() => handleTabClick("Profile")}
        style={{ cursor: "pointer" }}
        // onClick={() => navigate("/dashboard/profile")}
      >
        rein?
      </div>
      </div>
      </div>
    </div>
  );
}
