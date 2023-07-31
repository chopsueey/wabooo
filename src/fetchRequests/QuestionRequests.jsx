export async function getQuestions() {
  const response = await fetch("http://localhost:5000/dashboard/myquestions", {
    credentials: "include",
  });
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
}

export async function getQuestion(questionId) {
  const response = await fetch(
    `http://localhost:5000/dashboard/myquestions/${questionId}`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
}

export async function updateQuestion(questionId) {
  const response = await fetch(
    `http://localhost:5000/dashboard/question/${questionId}`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
}

export async function postQuestion(data) {
  try {
    const response = await fetch(
      "http://localhost:5000/dashboard/myquestions",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 201) {
      return console.log("Frage uploaded!");
    }
    // error or show the response message from the backend
    // to let the user know, what is happening or why it doesn't work
    throw new Error("Frage update failed");
  } catch (err) {
    console.log(err);
  }
}

export async function postAnswer(data) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/question/answer`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postLike(data) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/question/likes`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log();
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteLike(data) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/question/likes`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAnswer(data) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/question/answer`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getFeed(sortBy) {
  const response = await fetch(
    `http://localhost:5000/dashboard/feed/sort/?sortBy=${sortBy}`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  if (response.status === 200) {
    // console.log(data);
    return data;
  }
}

export async function getTrend(sortBy) {
  const response = await fetch(
    `http://localhost:5000/dashboard/trend/sort/?sortBy=${sortBy}`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  if (response.status === 200) {
    // console.log(data);
    return data;
  }
}

export async function getComment(questionId) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/question/${questionId}/allcomments`,
      {
        credentials: "include",
      }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postComment(data) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/question/:questionId/comment`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 201) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}
