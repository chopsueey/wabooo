//import PopularTopic from '../model/topicController.js'; // Passe den Pfad entsprechend an
import Question from '../model/questionModel.js';

export async function getAllQuestion(req, res, next) {
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

    // Alle Themen abrufen, sortiert nach Popularität
   // const topics = await Question.find().sort({ popularity: -1 });

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Themen.' });
  }
}
