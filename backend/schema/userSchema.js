const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const userPostSchema = {
  type: "object",
  properties: {
    name: stringLength,
    userName: stringLength,
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["name", "userName", "email", "password"],
  errorMessage: {
    properties: {
      name: "The name's length shall be between 2 and 30 letters",
      userName: "The name's length shall be between 2 and 30 letters",
      email: "The email shall have the correct format (e.g. contain @)",
      password:
        "The password shall have minimum 8 letters, including numbers and symbols",
    },
  },
  additionalProperties: false,
};

export const userGetSchema = {
  type: "object",
  additionalProperties: false,
};
