import { useEffect, useState } from "react";
import GeneralStore from "../store/GeneralContext";

export default function Profile() {
  const { userId } = GeneralStore();
  const [activeTab, setActiveTab] = useState("Favoriten");

  // PROFILE get
  // get user profile data, refresh on every load
  // of the dashboard component (see useEffect)

  const [userData, setUserData] = useState(null);

  async function getProfileData() {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/profile/${userId}`,
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
    console.log(userId);
    const data = { userName, nationality, age, userId };
    try {
      const response = await fetch("http://localhost:5000/dashboard/profile", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 201) {
        return console.log("Profile updated!");
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
    <div>
      <div className="container mx-auto px-4">
        <nav className="row">
          <ul className="flex flex-row space-x-12">
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
                activeTab === "Info" ? "selected-tab rounded-full" : ""
              }`}
              onClick={() => handleTabClick("Info")}
            >
              Info
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
        <div className="lg:w-3/4">
          {activeTab === "Favorites" && (
            <div>
              <h1 className="my-4 h-full text-lg decoration-sky-500 my-4 border-b-4 border-sky-500 text-center">
                Favorites{" "}
              </h1>
              <p>
                Sollte sich Bella Swan für Jacob statt für Edward entscheiden?
              </p>
              <p>
                Darf ich meinen Hund in der Waschmachine waschen, bei niedriger
                Temperatur?
              </p>
              <p>
                Ich bin in den Vater meines Freundes verliebt... Soll ich es dem
                Vater sagen und evtl. mit ihm eine Affäre anfangen?
              </p>
            </div>
          )}
          {activeTab === "Info" && (
            <div>
              <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Info{" "}
              </h1>
              <p>Kommt noch</p>
              <p>Kommt noch</p>
              <p>Kommt noch</p>
            </div>
          )}
          {activeTab === "Friends" && (
            <div>
              <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Friends{" "}
              </h1>
              <p>Klaus Dieter</p>
              <p>Frankie goes to Hollywood</p>
              <p>Pipi Langstrumpf</p>
            </div>
          )}
          {activeTab === "Edit" && (
            <div>
              <h1 className="my-4 h-full text-lg decoration-sky-500 my-4 border-b-4 border-sky-500 text-center">
                Edit{" "}
              </h1>
              <div>
                <div>
                  <label className="block uppercase tracking-wide textc text-xs font-bold mb-2">
                    Username
                    <input
                      onChange={(e) => {
                        setUserName(e.target.value);
                        console.log(userName);
                      }}
                      type="text"
                    />
                  </label>
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                    Nationality
                    <input
                      onChange={(e) => {
                        setNationality(e.target.value);
                        console.log(nationality);
                      }}
                      type="text"
                    />
                  </label>
                  <label className="block uppercase tracking-wide textc text-xs font-bold mb-2">
                    age
                    <input
                      onChange={(e) => {
                        setAge(e.target.value);
                        console.log(age);
                      }}
                      type="text"
                    />
                  </label>
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                    onClick={handleProfileUpdate}
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <h2>your profile data</h2>
          {userData ? <h3>{JSON.stringify(userData)}</h3> : ""}
        </div>
      </div>
    </div>
  );
}
