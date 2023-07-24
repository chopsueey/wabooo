import { useEffect, useState } from "react";
import {
  deleteProfileImage,
  getProfile,
  patchProfile,
} from "../fetchRequests/ProfileRequests";
import { Questions } from "../components/Questions";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import { useNavigate } from "react-router-dom";
import { countries } from "../../backend/model/data.js";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import AOS from "aos";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Info");
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

  function showEditMenu() {
    setShowEdit(!showEdit);
  }

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
    window.location.reload();
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
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, [activeTab]);

  return (
    <div className="max-w-2xl mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <section className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
        <div className={userPanelClassName + " z-10"}>
          <div className="user-panel flex lg:flex-col mt-10">
            <div
              style={{ cursor: "pointer" }}
              className="blubb mb-3 flex items-center space-x-2 hover:animate-pulse  text-cyan-300 font-bold py-2 px-4 rounded-lg"
              onClick={() => navigate(`/dashboard/`)}
            >
              <ArrowLongLeftIcon className="h-5 w-5 text-cyan-300" />
              <span>to dashboard</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className={
                (activeTab === "Info"
                  ? "active text-cyan-700"
                  : "text-cyan-300") +
                " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-xl"
              }
              onClick={() => handleTabClick("Info")}
            >
              Info
            </div>
            <div
              className={
                (activeTab === "Questions"
                  ? "active text-cyan-700"
                  : "text-cyan-300") +
                " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-xl"
              }
              onClick={() => handleTabClick("Questions")}
              style={{ cursor: "pointer" }}
            >
              Questions
            </div>
            <div
              className={
                (activeTab === "Favorites"
                  ? "active text-cyan-700"
                  : "text-cyan-300") +
                " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-xl"
              }
              onClick={() => handleTabClick("Favorites")}
              style={{ cursor: "pointer" }}
            >
              Favorites
            </div>

            <div
              className={
                (activeTab === "Follower"
                  ? "active text-cyan-700"
                  : "text-cyan-300") +
                " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-xl"
              }
              onClick={() => handleTabClick("Follower")}
              style={{ cursor: "pointer" }}
            >
              Follower
            </div>
            <div
              className={
                (activeTab === "Following"
                  ? "active text-cyan-700"
                  : "text-cyan-300") +
                " p-2 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg text-xl"
              }
              // onClick={() => handleTabClick("Profile")}
              style={{ cursor: "pointer" }}
              onClick={() => handleTabClick("Following")}
            >
              Following
            </div>
          </div>
        </div>

        <div
          style={{ minHeight: "100vh" }}
          className="grow px-4 sm:px-6 lg:px-10 mb-5 lg:pl-[15rem] mt-5 relative"
        >
          {activeTab === "Info" && (
            <>
              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
                </div>
              ) : (
                <>
                  <div className="container p-10 bg-gray-400 rounded-xl mt-2 lg:mt-8">
                    <div className="row flex flex-col justify-around flex-wrap sm:flex-row ">
                      <div className="profile-portrait flex flex-col justify-center items-center">
                        {userData ? (
                          <>
                            <div
                              style={{ maxWidth: "150px", maxHeight: "150px" }}
                              className="flex justify-center overflow-hidden rounded-full"
                            >
                              <img
                                style={{
                                  maxWidth: "150px",
                                  aspectRatio: "1/1",
                                  objectFit: "cover",
                                }}
                                src={
                                  userData.userProfile.image
                                    ? userData.userProfile.image
                                    : profilePic
                                }
                              />
                            </div>
                            {/* <div className="flex justify-center"
                        style={{ maxWidth: "150px"}}>
                          <div
                            className="flex-shrink-0 rounded-full"
                            style={{
                              backgroundImage: `url(${
                                userData.userProfile.image
                                  ? userData.userProfile.image
                                  : profilePic
                              })`,
                              backgroundSize: "100% 100%",
                              backgroundRepeat: "no-repeat",
                              width: "100%",
                              height: "100%",
                              aspectRatio: "1/1",
                            }}
                          ></div>
                        </div> */}
                            <div>
                              <button
                                style={{ maxWidth: "150px" }}
                                className="bg-slate-600 text-white rounded-md p-2 mt-2"
                                onClick={handleImageDeleteClick}
                              >
                                delete img
                              </button>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="profile-data flex flex-col justify-center text-white">
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
                    <div className="row flex justify-end">
                      {showEdit ? (
                        <div>
                          <form className="bg-gray-800 p-8 rounded-lg w-[200px] sm:w-[300px] mx-auto">
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
                              <select
                                onChange={(e) => {
                                  setCountry(e.target.value);
                                }}
                                className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md w-full"
                              >
                                <option value="none">empty</option>
                                {countries.map((item) => (
                                  <option value={item}>{item}</option>
                                ))}
                              </select>
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
                      <div>
                        <button
                          className="bg-slate-600 text-white rounded-md p-2"
                          onClick={showEditMenu}
                        >
                          edit
                        </button>
                      </div>
                    </div>
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
                  questions={askedQuestions}
                  answers={answersOfUser}
                  likes={likesOfUser}
                  isFollowing={userIsFollowing}
                  followers={userFollowers}
                />
              ) : (
                <h2 className="text-center">Nothing found :/</h2>
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
                  questions={likedQuestions}
                  answers={answersOfUser}
                  likes={likesOfUser}
                  isFollowing={userIsFollowing}
                  followers={userFollowers}
                />
              ) : (
                <h2 className="text-center">Nothing found :/</h2>
              )}
            </div>
          )}
          {activeTab === "Follower" && (
            <div className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col justify-center lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
              {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Friends{" "}
              </h1> */}
              <div className="flex flex-col my-4">
                {userFollowers.map((follower) => (
                  <div className="flex mb-2 items-center">
                    <div style={{ width: "40px", height: "40px" }} className="mr-2">
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
            <div className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col justify-center lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
            {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
              Friends{" "}
            </h1> */}
            <div className="flex flex-col my-4">
              {userIsFollowing.map((follower) => (
                <div className="flex mb-2 items-center">
                  <div style={{ width: "40px", height: "40px" }} className="mr-2">
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
    </div>
  );
}
