import { useEffect, useState } from "react";
import {
  deleteProfileImage,
  getProfile,
  patchProfile,
} from "../fetchRequests/ProfileRequests";
import { Questions } from "../components/Questions";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Info");

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // variables for question data
  const [askedQuestions, setAskedQuestions] = useState(null);
  const [likedQuestions, setLikedQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);

  // variables for profile

  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [country, setCountry] = useState(null);
  const [birthYear, setBirthyear] = useState(null);

  // cloudinary
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // patch request to update user profile when 'save' button clicked
  // user data is stored in variable data
  async function handleProfileUpdate(e) {
    e.preventDefault();
    const data = { userName, country, birthYear, image, imageUrl };
    setIsSaving(true);
    await patchProfile(data);
    const profileData = await getProfile();
    setUserData(profileData);
    setAskedQuestions(profileData.askedQuestions);
    setLikedQuestions(profileData.likedQuestions);
    setAnswersOfUser(profileData.userAnswers);
    setLikesOfUser(profileData.userLikes);
    setUserIsFollowing(profileData.userIsFollowing);
    setUserFollowers(profileData.userFollowers);
    setIsSaving(false);
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // cloudinary
  const handleImgUpload = (e) => {
    setImage(e.target.files[0].name);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  async function handleImageDeleteClick() {
    await deleteProfileImage();
  }

  // get user profile data, refresh on every load
  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      const profileData = await getProfile();
      setUserData(profileData);
      setAskedQuestions(profileData.askedQuestions);
      setLikedQuestions(profileData.likedQuestions);
      setAnswersOfUser(profileData.userAnswers);
      setLikesOfUser(profileData.userLikes);
      setUserIsFollowing(profileData.userIsFollowing);
      setUserFollowers(profileData.userFollowers);
      setIsLoading(false);
    })();
  }, [activeTab]);

  return (
    <div className="max-w-2xl mx-auto lg:max-w-5xl xl:max-w-none sm:px-6 lg:px-8">
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
              activeTab === "Questions" ? "selected-tab rounded-full" : ""
            }`}
            onClick={() => handleTabClick("Questions")}
          >
            Questions
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
      {activeTab === "Info" && (
        <>
          {isLoading ? (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
            </div>
          ) : (
            <div className="row flex flex-col sm:flex-row text-center p-10 bg-gray-400 rounded-xl">
              <div className="profile-portrait">
                {userData ? (
                  <div className="flex justify-center">
                    <img
                      style={{ maxWidth: "100px" }}
                      src={userData.userProfile.image}
                    />
                    <button onClick={handleImageDeleteClick}>delete img</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="profile-data text-white">
                {userData ? (
                  <>
                    <h3>Username: {userData.userProfile.userName}</h3>
                    <h3>Country: {userData.userProfile.country}</h3>
                    <h3>Birthyear: {userData.userProfile.birthYear}</h3>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </>
      )}
      {activeTab === "Questions" &&
        (isLoading ? (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        ) : askedQuestions && askedQuestions.length > 0 ? (
          <Questions
            questions={askedQuestions}
            answers={answersOfUser}
            likes={likesOfUser}
            isFollowing={userIsFollowing}
            followers={userFollowers}
          />
        ) : (
          <h2 className="text-center">Nothing found :/</h2>
        ))}
      {activeTab === "Favorites" &&
        (isLoading ? (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        ) : likedQuestions && likedQuestions.length > 0 ? (
          <Questions
            questions={likedQuestions}
            answers={answersOfUser}
            likes={likesOfUser}
            isFollowing={userIsFollowing}
            followers={userFollowers}
          />
        ) : (
          <h2 className="text-center">Nothing found :/</h2>
        ))}
      {activeTab === "Friends" && (
        <div className="">
          {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Friends{" "}
              </h1> */}
          <div className="flex flex-col items-center my-4">
            <p>Klaus Dieter</p>
            <p>Frankie goes to Hollywood</p>
            <p>Pippi Langstrumpf</p>
          </div>
        </div>
      )}
      {activeTab === "Edit" && (
        <div>
          {/* <h1 className="my-4 h-full text-lg decoration-sky-500 border-b-4 border-sky-500 text-center">
                Edit{" "}
              </h1> */}
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
                Country
                <input
                  className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                  onChange={(e) => {
                    setCountry(e.target.value);
                    console.log(country);
                  }}
                  type="text"
                />
              </label>

              <label className="block text-white text-xs font-bold mb-2">
                Birthyear
                <input
                  className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                  onChange={(e) => {
                    setBirthyear(e.target.value);
                    console.log(birthYear);
                  }}
                  type="text"
                />
              </label>
              <input
                className="mt-2 text-white"
                onChange={handleImgUpload}
                type="file"
              />
              {imageUrl ? (
                <div className="pt-10 flex justify-center">
                  <img className="w-48" src={imageUrl} />
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
          <div className="flex justify-center my-4">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleProfileUpdate}
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center">
                  <div className="mr-2 animate-spin">
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 12a4 4 0 1 1-8 0m8 0H8" />
                    </svg>
                  </div>
                  Saving...
                </div>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
