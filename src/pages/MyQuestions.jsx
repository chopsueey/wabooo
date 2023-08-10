import { useState } from "react";
import { postQuestion } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyQuestions() {
  const { setActiveTab } = GeneralStore();

  const [question, setQuestion] = useState(null);
  const [topic, setTopic] = useState("");
  const [topicsArray, setTopicsArray] = useState([]);

  const [saveLoading, setSaveLoading] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState({
    question1: false,
    question2: false,
    question3: false,
  });

  async function handlePostQuestion(e) {
    e.preventDefault();
    if (question.length < 5) {
      toast.error("Your question should have atleast 5 characters.", {
        className: "custom-toast",
      });
      return;
    }
    const topics = topicsArray;
    setSaveLoading(true);
    const data = { question, topics };
    await postQuestion(data);

    setSaveLoading(false);

    setActiveTab("Feed");
    toast.info("You posted a question", {
      className: "custom-toast",
    });
  }

  const handleQuestionClick = (questionKey) => {
    setIsContentVisible((prevState) => ({
      ...prevState,
      [questionKey]: !prevState[questionKey],
    }));
  };

  function handleAddClick(e) {
    if (topic.length >= 2 && topicsArray.length < 5) {
      setTopicsArray([...topicsArray, topic]);
      setTopic("");
    }
    if (topicsArray.length === 5) {
      toast.error("The number of maximum topics is 5.");
    }
    if (topic.length < 2) {
      toast.error(
        "Your topic has to have 2 or more characters and shouldn't consist of spaces!"
      );
    }
  }

  function handleDeleteTopic(e) {
    const filteredArray = topicsArray.filter(
      (item) => item !== e.target.innerText
    );
    setTopicsArray([...filteredArray]);
  }

  return (
    <div className="flex items-center justify-center mt-5 mb-5">
      <div className="w-full max-w-sm p-8 blubb1 rounded-md shadow-md">
        <h3
          className={`cursor-pointer text-cyan-300 mb-2 ${
            isContentVisible.question1 ? "" : ""
          }`}
          onClick={() => handleQuestionClick("question1")}
        >
          What could I ask?
        </h3>
        {isContentVisible.question1 && (
          <>
            <div className="w-full max-w-sm p-8 blubb rounded-md">
              <p>Does summer annoy you?</p>
              <p>Should my cat be nominated as a presidential candidate?</p>
              <p>Is living a vegetarian lifestyle advisable?</p>
            </div>
          </>
        )}
        <h3
          className={`cursor-pointer text-cyan-300 mb-2 ${
            isContentVisible.question2 ? "" : ""
          }`}
          onClick={() => handleQuestionClick("question2")}
        >
          How do I create a question?
        </h3>
        {isContentVisible.question2 && (
          <div className="w-full max-w-sm p-8 blubb rounded-md">
            <p>
              After you have chosen a question, simply click on the input field
              below and create your question. Please note that a word can
              contain a maximum of 15 letters and the total question length
              should not exceed 1000 characters.
            </p>
          </div>
        )}
        <h3
          className={`cursor-pointer text-cyan-300 mb-2 ${
            isContentVisible.question3 ? "" : ""
          }`}
          onClick={() => handleQuestionClick("question3")}
        >
          Rules for asking questions:
        </h3>
        {isContentVisible.question3 && (
          <div className="w-full max-w-sm p-8 blubb rounded-md">
            <p className="leading-relaxed space-y-2">
              Please do not ask offensive questions!
              <br /> Bullying is not allowed, so please refrain from asking
              about it as well! <br /> No racist or far-right questions! <br />{" "}
              Sexual questions are also not welcome!
            </p>
          </div>
        )}
        <h2 className="mb-4 text-xl font-semibold text-center text-white">
          Question
        </h2>

        <input
          placeholder="Please present your question here."
          onChange={(e) => {
            setQuestion(e.target.value);
            console.log(question);
          }}
          type="text"
          className="w-full p-4 rounded-md blubb1 placeholder-white shadow-md mb-4 text-white border-cyan-300 border-2"
        />
        <div className="flex flex-col text-white ">
          <label className="flex justify-center" htmlFor="topic-choice"></label>
          <input
            className="text-white border-cyan-300 border-2 rounded-md blubb placeholder-white placeholder:text-center"
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            list="topic-list"
            id="topic-choice"
            name="question-topics"
            placeholder="Choose or add topics"
          />

          <datalist id="topic-list">
            <option value="Politics" />
            <option value="Social" />
            <option value="Tech" />
            <option value="Music" />
            <option value="Movies" />
            {/* <option value={topic}></option> */}
          </datalist>
          <div className="flex justify-end">
            <button
              className="py-1 px-3 text-center text-green-500 font-bold border-green-500 border-2 rounded-md shadow-lg shadow-gray-900  text-xs sm ml-2 block max-w-[4rem] mb-3 mt-2 animate-pulse"
              onClick={(e) => handleAddClick(e)}
            >
              add
            </button>
          </div>
        </div>
        <div className="flex ">
          {topicsArray.map((item) => (
            <div
              onClick={(e) => handleDeleteTopic(e)}
              className=" py-1 px-3 text-center text-white border-cyan-300 border-2 rounded-md shadow-lg shadow-gray-900  text-xs sm ml-2 max-w-[4rem] mb-3 mt-2 hover:text-red-500 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={handlePostQuestion}
          className={`text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg font-medium rounded-lg text-medium px-5 py-1 w-full ${
            saveLoading ? "cursor-not-allowed opacity-75" : ""
          }`}
          disabled={saveLoading}
        >
          {saveLoading ? (
            <div className="flex items-center justify-center">
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
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
