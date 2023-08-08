import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { getQuestionData } from "../fetchRequests/QuestionRequests";

export function QuestionChart({ type, questionId }) {
  let chartInstance;

  // store question data from the server for diagrams
  const [questionData, setQuestionData] = useState(null);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  // const test = [
  //   { answer: "yes", age: 20 },
  //   { answer: "no", age: 30 },
  // ];

  function calcAverage(dataArray) {
    if (dataArray.length === 0) return 0;
    const sum = dataArray.reduce((total, number) => total + number, 0);
    console.log(sum);
    return sum;
  }

  function createDataSet(serverData) {
    if (type === "bar") {
      // create data for yes answer
      const birthYearYesAnswer = serverData.birthYears.filter(
        (data) => data.answer === "yes"
      );
      const ageOfYesAnswer = birthYearYesAnswer.map((data) =>
        data.birthYear ? currentYear - data.birthYear : 0
      );
      const averageAgeYes = calcAverage(ageOfYesAnswer) / ageOfYesAnswer.length;

      // create data for no answer
      const birthYearNoAnswer = serverData.birthYears.filter(
        (data) => data.answer === "no"
      );
      console.log(serverData);
      const ageOfNoAnswer = birthYearNoAnswer.map((data) =>
        data.birthYear ? currentYear - data.birthYear : 0
      );
      console.log(ageOfNoAnswer);
      const averageAgeNo = calcAverage(ageOfNoAnswer) / ageOfNoAnswer.length;

      return [
        { answer: "yes", age: averageAgeYes },
        { answer: "no", age: averageAgeNo },
      ];
    }
    // if (type === "doughnut") {
    //   const userCountries = serverData.countries.reduce(([],answer) => answer.country ? answer.country : "", [] )
    //   console.log(userCountries)
    // }
  }

  function createChart(dataSet) {
    chartInstance = new Chart(document.getElementById(type), {
      type: type,
      options: {
        aspectRatio: 1,
      },
      data: {
        labels: dataSet.map((row) => row.answer),
        datasets: [
          {
            label: "Average age",
            data: dataSet.map((row) => row.age),
          },
        ],
      },
    });
  }

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    (async function request() {
      // question data
      const questionDataFromServer = await getQuestionData(questionId);
      const questionDataToJson = await questionDataFromServer.json();
      setQuestionData(questionDataToJson);
      const dataSet = createDataSet(questionDataToJson);
      createChart(dataSet);
    })();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center relative w-full max-w-[500px] p-8 m-5 bg-gray-900 rounded-xl">
      <canvas id={type}></canvas>
    </div>
  );
}
