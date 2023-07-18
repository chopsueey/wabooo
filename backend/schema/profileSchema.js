const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const profilePostSchema = {
  type: "object",
  properties: {
    userName: stringLength,
    country: stringLength,
    birthYear: { type: "number" },
  },
  required: ["userName", "country", "birthYear"],
  errorMessage: {
    properties: {
      userName: "Your name shall have minimum 2 and maximum 30 letters",
      country: "Please, choose your country.",
      birthYear: "You shall be minimum 18 years old",
    },
  },
  additionalProperties: false,
};

export const profileGetSchema = {
  type: "object",
  additionalProperties: false,
};
