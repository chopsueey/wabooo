import { useEffect, useState } from "react";
import GeneralStore from "../store/GeneralContext";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Info");

  // PROFILE get
  // get user profile data, refresh on every load
  // of the dashboard component (see useEffect)

  const [userData, setUserData] = useState(null);

  async function getProfileData() {
    try {
      const response = await fetch(
        `https://wabooo.onrender.com/dashboard/profile`,
        { credentials: "include" }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setUserData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // PROFILE update
  const [userName, setUserName] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [age, setAge] = useState(null);

  // post request to update user profile when 'save' button clicked
  // user data is stored in variable data
  async function handleProfileUpdate(e) {
    e.preventDefault();
    const data = { userName, nationality, age };
    try {
      const response = await fetch(`https://wabooo.onrender.com/dashboard/profile`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        const result = await response.json()
        return console.log("Profile updated!", result);
      }
      throw new Error("Profile update failed");
    } catch (err) {
      console.log(err);
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex-col p-6 md:p-0 justify-around">
        <nav className="row">
          <ul className="flex flex-row space-x-12">
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Info" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Info")}
            >
              Info
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Favorites" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Favorites")}
            >
              Favorites
            </li>

            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Friends" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Friends")}
            >
              Friends
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeTab === "Edit" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Edit")}
            >
              Edit
            </li>
          </ul>
        </nav>
        <div>
          {activeTab === "Favorites" && (
            <div>
              <h1 className="my-4 h-full text-lg decoration-sky-500 my-4 border-b-4 border-sky-500 text-center">
                Favorites{" "}
              </h1>
              <div className="flex flex-col items-center my-4">
                <p>
                  Sollte sich Bella Swan für Jacob statt für Edward entscheiden?
                </p>
                <p>
                  Darf ich meinen Hund in der Waschmachine waschen, bei
                  niedriger Temperatur?
                </p>
                <p>
                  Ich bin in den Vater meines Freundes verliebt... Soll ich es
                  dem Vater sagen und evtl. mit ihm eine Affäre anfangen?
                </p>
              </div>
            </div>
          )}
          {activeTab === "Info" && (
            <div>
              <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Info{" "}
              </h1>

              <div style={{ color: "white" }}>
                <h2>your profile data</h2>
                {userData ? (
                  <>
                    <h3>{userData.userName}</h3>
                    <h3>{userData.nationality}</h3>
                    <h3>{userData.age}</h3>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
          {activeTab === "Friends" && (
            <div className="">
              <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Friends{" "}
              </h1>
              <div className="flex flex-col items-center my-4">
                <p>Klaus Dieter</p>
                <p>Frankie goes to Hollywood</p>
                <p>Pipi Langstrumpf</p>
              </div>
            </div>
          )}
          {activeTab === "Edit" && (
            <div>
              <h1 className="my-4 h-full text-lg decoration-sky-500 my-4 border-b-4 border-sky-500 text-center">
                Edit{" "}
              </h1>
              <div>
                <div>
                  <form className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
                    <label className="block text-white text-xs font-bold mb-2">
                      Username
                      <input
                        className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                        onChange={(e) => {
                          setUserName(e.target.value);
                          console.log(userName);
                        }}
                        type="text"
                      />
                    </label>

                    <label className="block text-white text-xs font-bold mb-2">
                      Nationality
                      <input
                        className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                        onChange={(e) => {
                          setNationality(e.target.value);
                          console.log(nationality);
                        }}
                        type="text"
                      />
                    </label>

                    <label className="block text-white text-xs font-bold mb-2">
                      Age
                      <input
                        className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                        onChange={(e) => {
                          setAge(e.target.value);
                          console.log(age);
                        }}
                        type="text"
                      />
                    </label>
                  </form>
                </div>
                <div className="flex justify-center my-4">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={handleProfileUpdate}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
