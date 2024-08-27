import { DOMAIN } from "../setDomain";

export async function getMostPopularTopics() {
  try {
    const response = await fetch(`${DOMAIN}/dashboard/topics`, {
      credentials: "include",
    });
    if (response.status === 200) {
        return response
    }
  } catch (err) {
    console.log(err);
  }
}
