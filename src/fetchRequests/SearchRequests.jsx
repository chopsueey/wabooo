import { DOMAIN } from "../main";

export async function searchRequest(userInput) {
  try {
    const response = await fetch(`${DOMAIN}/dashboard/search/?s=${userInput}`, {
      credentials: "include",
    });
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}
