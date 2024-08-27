import { DOMAIN } from "../setDomain";

export async function postFollow(data) {
  try {
    const response = await fetch(`${DOMAIN}/dashboard/follow`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFollow(data) {
  try {
    const response = await fetch(`${DOMAIN}/dashboard/unfollow`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getFollower(data) {
  try {
    const response = await fetch(
      `${DOMAIN}/dashboard/profile/${data}/follower`,
      {
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (err) {
    console.log(err);
  }
}
