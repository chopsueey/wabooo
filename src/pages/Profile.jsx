import { useEffect, useState } from "react";
import {
  deleteProfileImage,
  getProfile,
  patchProfile,
  patchProfileImage,
} from "../fetchRequests/ProfileRequests";
import { Questions } from "../components/Questions";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import { useNavigate } from "react-router-dom";
import { countries } from "../../backend/model/data.js";

import {
  ArrowLongLeftIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import AOS from "aos";

import ProfileImage from "../components/ProfileImage";

import ProfileMobileUserPanel from "../components/ProfileMobileUserPanel";
import randomGif from "../assets/gifs/randomGif.jsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Profile");
  // const { activeTab, setActiveTab, results } = GeneralStore();

  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const [userPanelClassName, setUserPanelClassName] = useState(
    "hidden sm:block lg:fixed xl:w-auto sm:px-6 lg:px-10"
  );

  // set user panel fixed when scrollY above 60px
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 60) {
      setUserPanelClassName(
        "hidden sm:block lg:fixed top-0 xl:w-auto sm:px-6 lg:px-10"
      );
    } else {
      setUserPanelClassName(
        "hidden sm:block lg:absolute xl:w-auto sm:px-6 lg:px-10"
      );
    }
  });
  const handleLoadMoreAsked = () => {
    if (askedQuestions.length > numQuestionsToShow1) {
      setNumQuestionsToShow1((num) => num + 5);
    }
  };
  const handleLoadMoreLiked = () => {
    if (likedQuestions.length > numQuestionsToShow2) {
      setNumQuestionsToShow2((num) => num + 5);
    }
  };
  // variables for question data
  const [askedQuestions, setAskedQuestions] = useState(null);
  const [likedQuestions, setLikedQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [numQuestionsToShow1, setNumQuestionsToShow1] = useState(5);
  const [numQuestionsToShow2, setNumQuestionsToShow2] = useState(5);
  // variables for profile

  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [country, setCountry] = useState(null);
  const [birthYear, setBirthyear] = useState(null);

  // cloudinary
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  // patch request to update user profile when 'save' button clicked
  // user data is stored in variable data
  async function handleProfileUpdate(e) {
    e.preventDefault();

    const data = { userName, country, birthYear };
    setIsSaving(true);
    const response = await patchProfile(data);
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("Changes uploaded.", {
        className: "custom-toast",
      });
      console.log(responseData);
    } else {
      toast.error("Something went wrong.", {
        className: "custom-toast",
      });
      console.log(responseData);
    }
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

  function showEditMenu() {
    setShowEdit(!showEdit);
  }

  const handleUploadButtonClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageUpload = async () => {
    const data = { image, imageUrl };
    await patchProfileImage(data);
    toast.success("Image uploaded successfully.", {
      className: "custom-toast",
    });
    setImage(null);
    setImageUrl(null);
    setImageUploaded(!imageUploaded);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0].name);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    toast.info("Click on save to upload your profile image.", {
      className: "custom-toast",
    });
  };

  const handleImageDeleteClick = async () => {
    setImage(null);
    setImageUrl(null);
  };

  const handleImageDelete = async () => {
    await deleteProfileImage();
    setImage(null);
    setImageUrl(null);
    toast.success("Image deleted.", {
      className: "custom-toast",
    });
  };

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
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, [activeTab, imageUploaded]);

  return (
    <div className="mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <section className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
        <div className={userPanelClassName + " z-10"}>
          <div className="user-panel flex lg:flex-col justify-center mt-10">
            <div
              style={{ cursor: "pointer" }}
              className="hidden lg:flex blubb mb-3 items-center space-x-2 hover:animate-pulse  text-cyan-300 font-bold py-2 px-4 rounded-lg"
              onClick={() => navigate(`/dashboard/`)}
            >
              <ArrowLongLeftIcon className="h-5 w-5 text-cyan-300" />
              <span>dashboard</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="lg:hidden blubb mb-3 flex items-center space-x-2 hover:animate-pulse  text-cyan-300 font-bold py-2 px-4 rounded-lg"
              onClick={() => navigate(`/dashboard/`)}
            >
              <ArrowLongLeftIcon className="h-5 w-5 text-cyan-300" />
            </div>
            <div
              style={{ cursor: "pointer" }}
              className={
                (activeTab === "Profile"
                  ? "active text-cyan-700 rounded-lg "
                  : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg rounded-lg ") +
                " p-2 text-xl"
              }
              onClick={() => handleTabClick("Profile")}
            >
              Profile
            </div>
            <div
              className={
                (activeTab === "Questions"
                  ? "active text-cyan-700 rounded-lg"
                  : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg rounded-lg") +
                " p-2 text-xl flex items-center justify-center"
              }
              onClick={() => handleTabClick("Questions")}
              style={{ cursor: "pointer" }}
            >
              {askedQuestions && (
                <span className="mr-1 rounded-lg bg-cyan-800 flex items-center justify-center w-8 h-8 text-cyan-300">
                  {askedQuestions.length}
                </span>
              )}
              Questions
            </div>
            <div
              className={
                (activeTab === "Favorites"
                  ? "active text-cyan-700 rounded-lg"
                  : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg rounded-lg") +
                " p-2 text-xl"
              }
              onClick={() => handleTabClick("Favorites")}
              style={{ cursor: "pointer" }}
            >
              Favorites
            </div>

            <div
              className={
                (activeTab === "Follower"
                  ? "active text-cyan-700 rounded-lg"
                  : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg rounded-lg") +
                " p-2 text-xl flex items-center"
              }
              onClick={() => handleTabClick("Follower")}
              style={{ cursor: "pointer" }}
            >
              {userFollowers && (
                <span className="mr-2 rounded-lg bg-cyan-800 flex items-center justify-center w-8 h-8 text-cyan-300">
                  {userFollowers.length}
                </span>
              )}
              Follower
            </div>
            <div
              className={
                (activeTab === "Following"
                  ? "active text-cyan-700 rounded-lg"
                  : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg rounded-lg") +
                " p-2 text-xl flex items-center"
              }
              style={{ cursor: "pointer" }}
              onClick={() => handleTabClick("Following")}
            >
              {userIsFollowing && (
                <span className="mr-2 rounded-lg bg-cyan-800 flex items-center justify-center w-8 h-8 text-cyan-300">
                  {userIsFollowing.length}
                </span>
              )}
              Following
            </div>
          </div>
        </div>

        <div
          style={{ minHeight: "100vh" }}
          className="grow px-2 sm:px-6 lg:px-10 mb-5 lg:pl-[15rem] mt-5 relative"
        >
          {activeTab === "Profile" && (
            <>
              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <img
                    src={
                      randomGif[
                        Math.floor(Math.random() * (randomGif.length + 1))
                      ]
                    }
                    alt=""
                  />
                </div>
              ) : (
                <>
                  <div className="container p-3 sm:p-10 blubb1 rounded-xl mt-2 lg:mt-8 shadow-lg shadow-black">
                    <div className="row flex flex-col justify-around flex-wrap sm:flex-row ">
                      <div className="profile-portrait flex flex-col justify-center items-center">
                        {userData ? (
                          <>
                            <div
                              className="rounded-full"
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              {userData.userProfile.image ? (
                                <img
                                  src={
                                    imageUrl
                                      ? imageUrl
                                      : userData.userProfile.image
                                  }
                                  alt="Profile"
                                  style={{
                                    width: "150px",
                                    height: "150px",
                                    aspectRatio: "1/1",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <img
                                  src={imageUrl ? imageUrl : profilePic}
                                  alt="Profile"
                                  style={{
                                    width: "150px",
                                    height: "150px",
                                    aspectRatio: "1/1",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                              )}

                              {imageUrl ? (
                                <button
                                  onClick={handleImageDeleteClick}
                                  style={{
                                    position: "absolute",
                                    bottom: "5px",
                                    right: "5px",
                                    backgroundColor: "red",
                                    color: "black",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  <XCircleIcon className="" />
                                </button>
                              ) : (
                                <button
                                  onClick={handleUploadButtonClick}
                                  style={{
                                    position: "absolute",
                                    bottom: "5px",
                                    right: "5px",
                                    backgroundColor: "black",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  <PencilIcon className="h-4 w-4 text-sky-400" />
                                </button>
                              )}

                              <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                              />
                            </div>
                            <div>
                              <button
                                style={{ maxWidth: "150px" }}
                                className="blubb text-cyan-400 bg-transparent border border-cyan-300 rounded-md p-2 mt-5 shadow-lg hover:bg-cyan-300 hover:text-white transition duration-300 ease-in-out"
                                onClick={handleImageUpload}
                              >
                                save
                              </button>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="profile-data flex flex-col justify-center mt-5 font-bold">
                        {userData ? (
                          <>
                            <div className="flex mb-2">
                              <h3 className="text-cyan-600 mr-2">Username:</h3>
                              <h4 className="text-white">
                                {userData.userProfile.userName}
                              </h4>
                            </div>
                            <div className="flex justify-start border border-cyan-700 mb-2 mt-2"></div>
                            <div className="flex mb-2">
                              <h3 className="text-cyan-600 mr-2">Country: </h3>
                              <h4 className="text-white">
                                {userData.userProfile.country}
                              </h4>
                            </div>
                            <div className="flex justify-start border border-cyan-700 mb-2 mt-2"></div>
                            <div className="flex mb-2">
                              <h3 className="text-cyan-600 mr-2">
                                Birthyear:{" "}
                              </h3>
                              <h4 className="text-white">
                                {userData.userProfile.birthYear}
                              </h4>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="row flex justify-end">
                      <div>
                        <button
                          className="blubb text-cyan-400 bg-transparent border border-cyan-300 rounded-md p-2 mt-2 ml-3 shadow-lg hover:bg-cyan-300 hover:text-white transition duration-300 ease-in-out"
                          onClick={showEditMenu}
                        >
                          edit
                        </button>
                      </div>
                    </div>
                    {showEdit ? (
                      <div className="mt-4">
                        <form className="blubb1 p-3 sm:p-8 rounded-lg sm:w-[400px] mx-auto">
                          <div className="mb-4">
                            <div className="flex items-center">
                              <label
                                className="textc text-base font-bold mr-2 pr-2"
                                htmlFor="username"
                              >
                                Username
                              </label>
                              <input
                                id="username"
                                className="mt-2 px-4 py-2 bg-slate-700 rounded-lg text-white font-bold w-full focus:outline-none"
                                onChange={(e) => {
                                  setUserName(e.target.value);
                                  console.log(userName);
                                }}
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center ">
                              <label
                                className="textc text-base font-bold mr-2 pr-2"
                                htmlFor="birthyear"
                              >
                                Birthyear
                              </label>
                              <input
                                id="birthyear"
                                className="ml-2 rounded-lg mt-2 px-4 py-2 bg-slate-700 text-white font-bold w-full focus:outline-none"
                                onChange={(e) => {
                                  setBirthyear(e.target.value);
                                  console.log(birthYear);
                                }}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-center ">
                              <label
                                className="textc text-base font-bold mr-2 pr-2"
                                htmlFor="country"
                              >
                                Country
                              </label>
                              <div className="bg-slate-700 w-full rounded-lg ml-4 pb-2 pr-3">
                                <select
                                  id="country"
                                  onChange={(e) => {
                                    setCountry(e.target.value);
                                  }}
                                  className="mt-2 px-4 py-2 bg-slate-700 bg-transparent text-white w-full focus:outline-none"
                                >
                                  <option className="bg-slate-700" value="none">
                                    Country
                                  </option>
                                  {countries.map((item) => (
                                    <option
                                      className="bg-slate-700"
                                      key={item}
                                      value={item}
                                    >
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>

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
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
            </>
          )}
          {activeTab === "Questions" && (
            <div data-aos="zoom-in-down" data-aos-delay="100">
              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
                </div>
              ) : askedQuestions && askedQuestions.length > 0 ? (
                <Questions
                  questions={askedQuestions.slice(0, numQuestionsToShow1)}
                  answers={answersOfUser}
                  likes={likesOfUser}
                  isFollowing={userIsFollowing}
                  followers={userFollowers}
                  ownQuestion={true}
                />
              ) : (
                <h2 className="text-center font-bold items-center text-cyan-300 blubb1 shadow-lg shadow-gray-950 rounded-full max-w-md p-4">
                  Nothing found 👀
                </h2>
              )}
              {askedQuestions.length > numQuestionsToShow1 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMoreAsked}
                    className="mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br animate-pulse duration- shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    show more
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "Favorites" && (
            <div data-aos="zoom-in-down" data-aos-delay="100">
              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
                </div>
              ) : likedQuestions && likedQuestions.length > 0 ? (
                <Questions
                  questions={likedQuestions.slice(0, numQuestionsToShow2)}
                  answers={answersOfUser}
                  likes={likesOfUser}
                  isFollowing={userIsFollowing}
                  followers={userFollowers}
                />
              ) : (
                <h2 className="text-center font-bold items-center text-cyan-300 blubb1 shadow-lg shadow-gray-950 rounded-full max-w-md p-4">
                  Nothing found 👀
                </h2>
              )}
              {likedQuestions.length > numQuestionsToShow2 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMoreLiked}
                    className="mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br animate-pulse duration- shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    show more
                  </button>
                </div>
              )}
            </div>
          )}
          {activeTab === "Follower" && (
            <div className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
              <div className="flex flex-col my-4">
                {userFollowers.map((follower) => (
                  <div className="flex mb-2 items-center">
                    <div
                      style={{ width: "50px", height: "50px" }}
                      className="mr-2"
                    >
                      <div
                        className="flex-shrink-0 rounded-full cursor-pointer"
                        style={{
                          backgroundImage: `url(${
                            follower.image ? follower.image : profilePic
                          })`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1/1",
                        }}
                        onClick={() =>
                          navigate(
                            `/dashboard/${follower.userName}/profile/${follower._id}`
                          )
                        }
                      ></div>
                    </div>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/dashboard/${follower.userName}/profile/${follower._id}`
                        )
                      }
                      className="text-white hover:underline"
                    >
                      {follower.userName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "Following" && (
            <div className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
              <div className="flex flex-col my-4">
                {userIsFollowing.map((follower) => (
                  <div className="flex mb-2 items-center">
                    <div
                      style={{ width: "50px", height: "50px" }}
                      className="mr-2"
                    >
                      <div
                        className="flex-shrink-0 rounded-full cursor-pointer"
                        style={{
                          backgroundImage: `url(${
                            follower.image ? follower.image : profilePic
                          })`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1/1",
                        }}
                        onClick={() =>
                          navigate(
                            `/dashboard/${follower.userName}/profile/${follower._id}`
                          )
                        }
                      ></div>
                    </div>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/dashboard/${follower.userName}/profile/${follower._id}`
                        )
                      }
                      className="text-white hover:underline"
                    >
                      {follower.userName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ProfileMobileUserPanel
        activeTab2={activeTab}
        setActiveTab2={setActiveTab}
      />
    </div>
  );
}
