import { useEffect, useState } from "react";
import { getOthersProfile } from "../fetchRequests/ProfileRequests";
import { Questions } from "../components/Questions";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import AOS from "aos";

export default function OthersProfile() {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("Info");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const { profileId } = useParams();

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
      setIsLoading(false);
    })();
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, [activeTab, state]);

  useEffect(() => {
    setActiveTab("Info");
  }, [state]);

  return (
    <div className="max-w-2xl mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <section className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
        <div className={userPanelClassName + " z-10"}>
          <div className="user-panel flex lg:flex-col  mt-10">
            <div
              style={{ cursor: "pointer" }}
              className="blubb mb-3 flex items-center space-x-2 hover:animate-pulse  text-cyan-300 font-bold py-2 px-4 rounded-lg"
              onClick={() => navigate(`/dashboard/`)}
            >
              <ArrowLongLeftIcon className="h-5 w-5 text-cyan-300" />
              <span>dashboard</span>
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
          className="grow px-4 sm:px-6 lg:px-10 lg:pl-[15rem] mb-5 mt-5 relative"
        >
          {activeTab === "Info" && (
            <>
              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
                </div>
              ) : (
                <div className="row flex flex-col justify-around flex-wrap sm:flex-row text-center p-10 bg-gray-400 rounded-xl mt-2 lg:mt-8">
                  <div className="profile-portrait flex justify-center">
                    {userData ? (
                      // <div className="flex justify-center">
                      //   <img
                      //     style={{ maxWidth: "100px", aspectRatio: "1/1", objectFit: "cover" }}
                      //     src={
                      //       userData.userProfile.image
                      //         ? userData.userProfile.image
                      //         : profilePic
                      //     }
                      //   />
                      // </div>
                      <div
                        style={{ maxWidth: "150px" }}
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
                    ) : (
                      // <div style={{ maxWidth: "150px" }}>
                      //   <div
                      //     className="flex-shrink-0 rounded-full"
                      //     style={{
                      //       backgroundImage: `url(${
                      //         userData.userProfile.image
                      //           ? userData.userProfile.image
                      //           : profilePic
                      //       })`,
                      //       backgroundSize: "100% 100%",
                      //       backgroundRepeat: "no-repeat",
                      //       width: "100%",
                      //       height: "100%",
                      //       aspectRatio: "1/1",
                      //     }}
                      //   ></div>
                      // </div>
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
                    <div
                      style={{ width: "40px", height: "40px" }}
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
            <div className="bg-gray-500 bg-opacity-25 rounded-xl row flex flex-col justify-center lg:flex-row sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
            {/* <h1 className="my-4 text-lg border-b-4 border-sky-500 text-center">
              Friends{" "}
            </h1> */}
            <div className="flex flex-col my-4">
              {userIsFollowing.map((follower) => (
                <div className="flex mb-2 items-center">
                  <div
                    style={{ width: "40px", height: "40px" }}
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
    </div>
  );
}
