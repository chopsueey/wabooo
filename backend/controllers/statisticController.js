import Question from "../model/questionModel.js";
import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";

export async function findProfilesByQuestionId(req, res, next) {
    const questionId=req.params.questionId
  try {
    const users = await User.find({ answeredQuestions: questionId });
    const profileIds = users.map((user) => user.profile);
    const profiles = await Profile.find({ _id: { $in: profileIds } });
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Frage nicht gefunden.");
    }

    // Alle Profile finden, die auf die Frage geantwortet haben
    //const profiles = await findProfilesByQuestionId(questionId);

    // Statistiken erstellen
    const statistics = {
      questionText: question.text,
      totalAnswers: profiles.length,
      yesAnswers: profiles.filter((profile) => profile.answer === "ja").length,
      noAnswers: profiles.filter((profile) => profile.answer === "nein").length,
      countries: {},
      birthYears: {},
    };

    // Statistiken für Länder und Geburtsjahre erstellen
    profiles.forEach((profile) => {
      if (statistics.countries[profile.country]) {
        statistics.countries[profile.country]++;
      } else {
        statistics.countries[profile.country] = 1;
      }

      if (statistics.birthYears[profile.birthYear]) {
        statistics.birthYears[profile.birthYear]++;
      } else {
        statistics.birthYears[profile.birthYear] = 1;
      }
    });

    //return res.status(200).send();
    return res.status(200).json(statistics); // Statistikdaten als JSON-Antwort senden

  } catch (error) {
    return res.status(500).json({ error: "Ein Fehler ist aufgetreten." });
    //throw error;
  }
};

