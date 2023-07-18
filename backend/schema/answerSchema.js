const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const answerPostSchema = {
  type: "object",
  properties: {
    user: stringLength,
    question: stringLength,
  },
  required: ["user", "answer"],
  errorMessage: {
    properties: {
      user: "The name's length shall be between 2 and 30 letters!",
      answer:
        "Please, provide your answer as 'yes' or 'no'",
    },
  },
  additionalProperties: false,
};

export const answerGetSchema = {
  type: "object",
  additionalProperties: false,
};
