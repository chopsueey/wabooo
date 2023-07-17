import { useState } from "react";

export function InfoSidebar() {
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

  return (
    <div className={infoSidebarClassName}>
      <div className="pr-10">
        <div className="bg-slate-200 rounded-md flex flex-wrap max-w-[200px]">
          <div className="p-2">popular topics</div>
          <span className="bg-slate-600 rounded-md m-2 text-white">topic1</span>

          <span className="bg-slate-600 rounded-md m-2 text-white">topic2</span>
          <span className="bg-slate-600 rounded-md m-2 text-white">topic3</span>
          <span className="bg-slate-600 rounded-md m-2 text-white">topic4</span>
          <span className="bg-slate-600 rounded-md m-2 text-white">topic5</span>
        </div>
      </div>
      <div className="pr-10 mt-2">
        <div className="bg-slate-200 rounded-md flex flex-wrap max-w-[200px]">
          <div className="p-2">popular questions</div>
          <span className="bg-slate-600 rounded-md m-2 text-white">question1</span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question2
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question3
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question4
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question5
          </span>
        </div>
      </div>
      <div className="pr-10 mt-2">
        <div className="bg-slate-200 rounded-md flex flex-wrap max-w-[200px]">
          <div className="p-2">popular profiles</div>
          <span className="bg-slate-600 rounded-md m-2 text-white">profile 1</span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 2
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 3
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 4
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 5
          </span>
        </div>
      </div>
    </div>
  );
}
