import Chart from "chart.js/auto";
import { useEffect } from "react";

export function QuestionChart({ type }) {
  let chartInstance;

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  function createChart() {
    chartInstance = new Chart(document.getElementById(type), {
      type: type,
      options: {
        aspectRatio: 1,
      },
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    createChart();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center relative w-full max-w-[500px] p-8 m-5 bg-gray-900 rounded-xl">
      <canvas id={type}></canvas>
    </div>
  );
}
