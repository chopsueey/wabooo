import Question from "../model/questionModel.js";
import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";
import Answer from "../model/answeredModel.js";
import mongoose from "mongoose";

export async function findProfilesByQuestionId(req, res, next) {
  // create ObjectId for aggregation
  const questionId = new mongoose.Types.ObjectId(req.params.questionId);

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(400).json({ msg: "nothing found" });
    }
    // find all profiles, who answered the question
    // const answers = await Answer.find({ question: questionId });
    // const yesAnswers = answers.filter((answer) => answer.answer === "yes");
    // const noAnswers = answers.filter((answer) => answer.answer === "no");
    // const yesAnswerCountries = yesAnswers.map(async (yes) => {
    //   return await Profile.find()
    // })
    const allAnswers = await Answer.aggregate([
      { $match: { question: questionId } },
      {
        $lookup: {
          from: "profiles",
          localField: "user",
          foreignField: "userId",
          as: "profile",
        },
      },
    ]);
    const countries = allAnswers.map((answer) => {return {country: answer.profile[0].country, answer: answer.answer}});
    const birthYears = allAnswers.map((answer) => {return {birthYear: answer.profile[0].birthYear, answer: answer.answer}});
    // Alle Profile finden, die auf die Frage geantwortet haben
    //const profiles = await findProfilesByQuestionId(questionId);

    // Statistiken erstellen
    const statistics = {
      question: question.question,
      totalAnswers: question.yes + question.no,
      countries: countries,
      birthYears: birthYears,
    };

    // Statistiken für Länder und Geburtsjahre erstellen
    // profiles.forEach((profile) => {
    //   if (statistics.countries[profile.country]) {
    //     statistics.countries[profile.country]++;
    //   } else {
    //     statistics.countries[profile.country] = 1;
    //   }

    //   if (statistics.birthYears[profile.birthYear]) {
    //     statistics.birthYears[profile.birthYear]++;
    //   } else {
    //     statistics.birthYears[profile.birthYear] = 1;
    //   }
    // });
    return res.status(200).json(statistics); // Statistikdaten als JSON-Antwort senden
  } catch (error) {
    next(error);
  }
}
