import { useEffect, useState } from "react";
import { getOthersProfile } from "../fetchRequests/ProfileRequests";
import { Questions } from "../components/Questions";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLongLeftIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import AOS from "aos";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileMobileUserPanel from "../components/ProfileMobileUserPanel";
import {
  deleteFollow,
  getFollower,
  postFollow,
} from "../fetchRequests/FollowRequests";

export default function OthersProfile() {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const { profileId } = useParams();

  const [userPanelClassName, setUserPanelClassName] = useState(
    "hidden sm:block lg:fixed xl:w-auto sm:px-6 lg:px-10"
  );

  const [numQuestionsToShow1, setNumQuestionsToShow1] = useState(5);
  const [numQuestionsToShow2, setNumQuestionsToShow2] = useState(5);
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
  const [isFollowed, setIsFollowed] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(undefined);
  const [userData, setUserData] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
  async function handleFollowClick() {
    const followingProfileId = profileId;
    const data = { followingProfileId };
    await postFollow(data);

    setIsFollowed(true);
    toast.success("You are now following.", {
      className: "custom-toast",
    });
  }

  async function handleUnfollowClick() {
    const followingProfileId = profileId;
    const data = { followingProfileId };
    await deleteFollow(data);

    setIsFollowed(false);
    toast.info("You stopped following.", {
      className: "custom-toast",
    });
  }

  // get user profile data, refresh on every load
  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      const profileData = await getOthersProfile(profileId);
      setUserData(profileData);
      setAskedQuestions(profileData.askedQuestions);
      setLikedQuestions(profileData.likedQuestions);
      setAnswersOfUser(profileData.userAnswers);
      setLikesOfUser(profileData.userLikes);
      setUserIsFollowing(profileData.userIsFollowing);
      setUserFollowers(profileData.userFollowers);

      // check if already followed and if own profile
      const response = await getFollower(profileId);

      // check if the profile of the question creator
      // is the same as the current user, so that the user
      // can't follow himself
      response.userProfileId._id === profileId
        ? setIsOwnProfile(true)
        : setIsOwnProfile(false);

      // if user follows the question creator
      // switch follow/unfollow button
      response.isUserFollowingTheProfile === null
        ? setIsFollowed(false)
        : setIsFollowed(true);
      setIsLoading(false);
    })();
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, [state]);

  useEffect(() => {
    setActiveTab("Profile");
  }, [state]);

  return (
    <div className="mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <section className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
        <div className={userPanelClassName + " z-10"}>
          <div className="user-panel flex lg:flex-col justify-center  mt-10">
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
                  ? "active text-cyan-700 rounded-lg"
                  : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg rounded-lg") +
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
              onClick={() => handleTabClick("Following")}
              style={{ cursor: "pointer" }}
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
          className="grow px-2 sm:px-6 lg:px-10 lg:pl-[15rem] mb-5 mt-5 relative"
        >
          {activeTab === "Profile" && (
            <>
              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
                </div>
              ) : (
                <div className="row relative flex flex-col justify-around flex-wrap sm:flex-row text-center p-10 blubb1 rounded-xl mt-2 lg:mt-8">
                  {!isOwnProfile ? (
                    <div className="absolute top-3 right-4 text-black p-2">
                      {!isFollowed ? (
                        <button
                          className="text-cyan-300 tooltip bg-gray-900 rounded-lg p-3 font-bold"
                          onClick={handleFollowClick}
                        >
                          <span class="tooltiptext blubb border  border-white text-cyan-300">
                            Follow
                          </span>{" "}
                          <UserPlusIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          className="text-red-700   bg-gray-900 rounded-lg p-3 tooltip font-bold"
                          onClick={handleUnfollowClick}
                        >
                          <span class="tooltiptext border  border-white text-red-700">
                            Unfollow
                          </span>{" "}
                          <UserMinusIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="profile-portrait flex justify-center">
                    {userData ? (
                      <div
                        style={{ maxWidth: "150px" }}
                        className="flex justify-center mb-10 overflow-hidden rounded-full"
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
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="profile-data flex flex-col justify-center text-cyan-300 font-bold">
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
                          <h3 className="text-cyan-600 mr-2">Birthyear: </h3>
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
                <div className="flex justify-center items-center">
                  <h2 className="text-center font-bold items-center text-cyan-300 blubb1 shadow-lg shadow-gray-950 rounded-full max-w-md p-4">
                    Nothing found 👀
                  </h2>
                </div>
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
              {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
                Friends{" "}
              </h1> */}
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
                            `/dashboard/${follower.userName}/profile/${follower._id}`,
                            { state: { state } }
                          )
                        }
                      ></div>
                    </div>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/dashboard/${follower.userName}/profile/${follower._id}`,
                          { state: { state } }
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
              {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
              Friends{" "}
            </h1> */}
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
                            `/dashboard/${follower.userName}/profile/${follower._id}`,
                            { state: { state } }
                          )
                        }
                      ></div>
                    </div>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/dashboard/${follower.userName}/profile/${follower._id}`,
                          { state: { state } }
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
