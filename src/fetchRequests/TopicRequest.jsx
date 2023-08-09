export async function getMostPopularTopics() {
  try {
    const response = await fetch(`http://localhost:5000/dashboard/topics`, {
      credentials: "include",
    });
    if (response.status === 200) {
        return response
    }
  } catch (err) {
    console.log(err);
  }
}
