import { useState } from "react";
import { postQuestion } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";

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
    const topics = topicsArray;
    setSaveLoading(true);
    const data = { question, topics };
    await postQuestion(data);

    setSaveLoading(false);

    setActiveTab("Feed");
  }

  const handleQuestionClick = (questionKey) => {
    setIsContentVisible((prevState) => ({
      ...prevState,
      [questionKey]: !prevState[questionKey],
    }));
  };

  function handleAddClick(e) {
    if (topic.length >= 0) {
      setTopicsArray([...topicsArray, topic]);
      setTopic("");
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
          Was könnte ich fragen?
        </h3>
        {isContentVisible.question1 && (
          <>
            <div className="w-full max-w-sm p-8 blubb rounded-md">
              <p>Nervt euch der Sommer?</p>
              <p>
                Sollte meine Katze als Präsidentschaftskandidat nominiert
                werden?{" "}
              </p>
              <p>Sollte man vegetarisch leben?</p>
            </div>
          </>
        )}
        <h3
          className={`cursor-pointer text-cyan-300 mb-2 ${
            isContentVisible.question2 ? "" : ""
          }`}
          onClick={() => handleQuestionClick("question2")}
        >
          Wie erstelle ich eine Frage?
        </h3>
        {isContentVisible.question2 && (
          <div className="w-full max-w-sm p-8 blubb rounded-md">
            <p>
              Nachdem du dich für eine Frage entschieden hast, klickst du unten
              einfach in das Eingabefeld und erstellst deine Frage. Bitte
              beachte, das ein Wort maximal 15 Buchstaben enthalten darf und die
              Gesamtfrage nicht mehr als 1000 Zeichen haben sollte.
            </p>
          </div>
        )}
        <h2 className="mb-4 text-xl font-semibold text-center text-white">
          Question
        </h2>

        <input
          onChange={(e) => {
            setQuestion(e.target.value);
            console.log(question);
          }}
          type="text"
          className="w-full p-4 rounded-md shadow-md mb-4 text-gray-800"
        />
        <div className="flex flex-col text-yellow-100">
          <label htmlFor="topic-choice">Topics</label>
          <input
            className="text-black"
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            list="topic-list"
            id="topic-choice"
            name="question-topics"
          />

          <datalist id="topic-list">
            <option value="Politics" />
            <option value="Social" />
            <option value="Tech" />
            <option value="Music" />
            <option value="Movies" />
            {/* <option value={topic}></option> */}
          </datalist>
          <button
            className="text-green-500 text-end"
            onClick={(e) => handleAddClick(e)}
          >
            add
          </button>
        </div>
        <div className="flex">
          {topicsArray.map((item) => (
            <div
              onClick={(e) => handleDeleteTopic(e)}
              className="text-white mr-2 hover:text-red-500 cursor-pointer"
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
