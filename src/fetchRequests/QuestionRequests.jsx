export async function getQuestions() {
  const response = await fetch("https://wabooo-server.up.railway.app/dashboard/myquestions", {
    credentials: "include",
  });
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
}

export async function getQuestion(questionId) {
  const response = await fetch(
    `https://wabooo-server.up.railway.app/dashboard/myquestions/${questionId}`,
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
    `https://wabooo-server.up.railway.app/dashboard/question/${questionId}`,
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
      "https://wabooo-server.up.railway.app/dashboard/myquestions",
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

export async function deleteQuestion(data) {
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/dashboard/profile/questions/delete`,
      {
        method: "DELETE",
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

export async function postAnswer(data) {
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/dashboard/question/answer`,
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
      `https://wabooo-server.up.railway.app/dashboard/question/likes`,
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
      `https://wabooo-server.up.railway.app/dashboard/question/likes`,
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
      `https://wabooo-server.up.railway.app/dashboard/question/answer`,
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
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/dashboard/feed/sort/?sortBy=${sortBy}`,
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
  } catch (err) {
    console.log(err);
  }
}

export async function getTrend(sortBy) {
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/dashboard/trend/sort/?sortBy=${sortBy}`,
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
  } catch (err) {
    console.log(err);
  }
}

export async function getComment(questionId) {
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/dashboard/question/${questionId}/allcomments`,
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
      `https://wabooo-server.up.railway.app/dashboard/question/${data.questionId}/comment`,
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

export async function patchComment(data) {
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/dashboard/question/${data.questionId}/${data.commentId}`,
      {
        method: "PATCH",
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

export async function deleteComment(data) {
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/dashboard/question/${data.questionId}/${data.commentId}`,
      {
        method: "DELETE",
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

export async function getQuestionData(questionId) {
  try {
    const response = await fetch(
      `https://wabooo-server.up.railway.app/statistics/${questionId}`,
      { credentials: "include" }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}
