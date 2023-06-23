import { useEffect, useState } from "react";
import { Questions } from "./Questions";

export default function QuestionsOfWeek() {
  const [allQuestions, setAllQuestions] = useState(null);

  async function getQuestions() {
    const response = await fetch(
      "/dashboard/myquestions",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setAllQuestions(data);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="row most-clicked">
      {/* {allQuestions ? <Questions questions={allQuestions} /> : ""} */}
      {allQuestions && allQuestions.length > 0 ? (
        <Questions questions={allQuestions} />
      ) : (
        <h2 className="text-center">Nothing found :/</h2>
      )}
    </div>
  );
}
