export async function getProfile() {
  try {
    const response = await fetch(`http://localhost:5000/dashboard/profile`, {
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getOthersProfile(profileId) {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/profile/${profileId}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function patchProfile(data) {
  try {
    const response = await fetch(`http://localhost:5000/dashboard/profile`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return response;

  } catch (err) {
    console.log(err);
  }
}

export async function patchProfileImage(data) {
  try {
    const response = await fetch(`http://localhost:5000/dashboard/profile/upload/image`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return response;
    
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProfileImage() {
  try {
    const response = await fetch(
      `http://localhost:5000/dashboard/profile/cloudinary`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseData = await response.json();
      return console.log(responseData);
    }
  } catch (err) {
    console.log(err);
  }
}
