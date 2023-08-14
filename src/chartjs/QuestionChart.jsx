import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { getQuestionData } from "../fetchRequests/QuestionRequests";

export function QuestionChart({ type, questionId }) {
  let chartInstance;
  let chartTitle = "";

  if (type === "bar") {
    chartTitle = "Average age of users";
  }
  if (type === "doughnut") {
    chartTitle = "Origin of users";
  }
  // store question data from the server for diagrams
  const [questionData, setQuestionData] = useState(null);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  function calcAverage(dataArray) {
    if (dataArray.length === 0) return 0;
    const sum = dataArray.reduce((total, number) => total + number, 0);
    return sum;
  }

  function countOccurrences(array) {
    const count = {};
    array.forEach((item) => {
      count[item] = (count[item] || 0) + 1;
    });
    function formatCountryCounts(countryCounts) {
      return Object.entries(countryCounts).map(([country, count]) => ({
        country,
        count,
      }));
    }

    const formattedCounts = formatCountryCounts(count);

    return formattedCounts;
  }

  function createDataSet(serverData) {
    if (type === "bar") {
      // create data for yes answer
      const birthYearYesAnswer = serverData.birthYears.filter(
        (data) => data.answer === "yes" && data.birthYear
      );
      const ageOfYesAnswer = birthYearYesAnswer.map(
        (data) => currentYear - data.birthYear
      );

      const averageAgeYes = calcAverage(ageOfYesAnswer) / ageOfYesAnswer.length;

      // create data for no answer
      const birthYearNoAnswer = serverData.birthYears.filter(
        (data) => data.answer === "no" && data.birthYear
      );
      const ageOfNoAnswer = birthYearNoAnswer.map(
        (data) => currentYear - data.birthYear
      );
      const averageAgeNo = calcAverage(ageOfNoAnswer) / ageOfNoAnswer.length;
console.log(averageAgeNo)
      return [
        { answer: "yes", age: averageAgeYes.toFixed(1) },
        { answer: "no", age: averageAgeNo.toFixed(1) },
      ];
    }
    // only show the country of users without there answer
    if (type === "doughnut") {
      const userCountries = serverData.countries
        .filter((data) => data.country)
        .map((answer) => answer.country);

      const countryCounts = countOccurrences(userCountries);

      return countryCounts;
    }
  }

  function createChart(dataSet) {
    let dataLabel = "";
    let options = {};
    let dataConfig = {};

    // BAR
    if (type === "bar") {
      // dataLabel = [" yes", " no" ];
      dataLabel = " average age";
      options = {
        plugins: {
          legend: {
            display: false,
          },
        },
        aspectRatio: 1,
        scales: {
          x: {
            // X-axis scale configuration
            grid: {
              color: "rgba(255, 255, 255, 0.2)", // Color of the vertical grid lines
            },
            ticks: {
              font: {
                size: 18,
              },

              color: "rgba(255, 255, 255, 1)", // Color of the x-axis labels
            },
          },
          y: {
            // title: {
            //   display: true,
            //   text: "age",
            //   color: "white",
            //   padding: {
            //     bottom: 10,
            //   },
            //   font: {
            //     size: 16
            //   }
            // },
            // Y-axis scale configuration
            grid: {
              color: "rgba(255, 255, 255, 0.2)", // Color of the horizontal grid lines
            },
            ticks: {
              color: "rgba(255, 255, 255, 1)", // Color of the y-axis labels
            },
          },
        },
      };
      dataConfig = {
        labels: dataSet.map((row) => row.answer),
        datasets: [
          {
            label: dataLabel,
            data: dataSet.map((row) => row.age),
            backgroundColor: ["rgb(74 222 128)", "rgb(239 68 68)"],
            // borderColor: ["rgb(0, 168, 61)", "rgb(189, 0, 0)"],
            // borderWidth: 3,
          },
        ],
      };
    }

    // DOUGHNUT
    if (type === "doughnut") {
      dataLabel = " users from this country";

      options = {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              font: {
                size: 16,
              },
              color: "white",
            },
          },
        },
        aspectRatio: 1,
        scales: {
          x: {
            // X-axis scale configuration
            grid: {
              display: false,
              color: "rgba(255, 255, 255, 0.2)", // Color of the vertical grid lines
            },
            ticks: {
             
              color: "rgba(255, 255, 255, 0)", // Color of the x-axis labels
            },
          },
          y: {
            display: false,
          },
        },
      };
      dataConfig = {
        labels: dataSet.map((row) => row.country),
        datasets: [
          {
            label: dataLabel,
            data: dataSet.map((row) => row.count),
          },
        ],
      };
    }

    chartInstance = new Chart(document.getElementById(type), {
      type: type,
      options: options,
      data: dataConfig,
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
    <div className="flex flex-wrap justify-center items-center relative w-full max-w-[500px] p-6 m-5 rounded-xl blubb shadow-lg shadow-black">
      <h1 className="title pb-4 text-xl sm:text-2xl">{chartTitle}</h1>
      <canvas id={type}></canvas>
    </div>
  );
}
