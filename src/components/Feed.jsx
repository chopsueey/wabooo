import { useEffect, useState } from "react";
import { Questions } from "./Questions";

export default function Feed() {
  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [isLoading, setIsLoading] = useState(false);

  async function requestFeed() {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/feed/sort/?sortBy=${sortBy}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        setSortedQuestions(data.found);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Fehler bei der Anfrage:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    requestFeed();
  }, [sortBy]);

  return (
    <div className="row feed">
      <div className="flex justify-end">
        <select
          className="bg-black"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="latest">latest</option>
          <option value="lastHour">one hour</option>
          <option value="last12Hours">12 hours</option>
          <option value="last24Hours">24 hours</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : sortedQuestions && sortedQuestions.length > 0 ? (
        <Questions questions={sortedQuestions} />
      ) : (
        <h2 className="text-center">Nothing found :/</h2>
      )}
    </div>
  );
}
