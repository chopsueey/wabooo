export async function getMostPopularTopics() {
  try {
    const response = await fetch(`https://wabooo-server.up.railway.app/dashboard/topics`, {
      credentials: "include",
    });
    if (response.status === 200) {
        return response
    }
  } catch (err) {
    console.log(err);
  }
}
