import Question from "../model/questionModel.js";

export async function getPopularTopics(req, res, next) {
  const sortBy = req.query.sortBy;
  let sortTime = 168; // Eine Woche

  try {
    if (sortBy === "latest") {
      // latest questions not older than a month
      sortTime = 720;
    }
    if (sortBy === "lastHour") {
      sortTime = 1;
    }
    if (sortBy === "last12Hours") {
      sortTime = 12;
    }
    if (sortBy === "last24Hours") {
      sortTime = 24;
    }

    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - sortTime);

    const foundQuestions = await Question.find({
      createdAt: { $gte: currentTime },
    }).exec();
    const questionsWithTopics = foundQuestions.filter(
      (question) => question.topics.length > 0
    );

    const allTopics = questionsWithTopics
      .map((question) => question.topics)
      .join(",")
      .split(",");

    const topicCount = {};
    const topicPopularity = allTopics.forEach((topic) => {
      topicCount[topic.toLowerCase()] = allTopics.filter(
        (toCompare) => toCompare.toLowerCase() === topic.toLowerCase()
      ).length;
    });
    const mostPopularTopics = Object.entries(topicCount);
    mostPopularTopics.sort((a, b) => b[1] - a[1]);
    const fiveMostPopularTopics = mostPopularTopics.filter(
      (topic, index) => index <= 4
    );
    res.status(200).json({
      mostPopularTopics: fiveMostPopularTopics,
    });
  } catch (error) {
    next()
  }
}
