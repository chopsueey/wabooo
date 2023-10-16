export const userRegister = async (data) => {
  try {
    const response = await fetch("https://wabooo-server.onrender.com/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 201) {
      console.log("Registrierung erfolgreich!", result);
      return { response, result };
    }
    console.log(result);
    if (response.status === 400) {
      return { response, result };
    }
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (data) => {
  try {
    const response = await fetch("https://wabooo-server.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const userData = await response.json();
    if (response.status === 200) {
      console.log("Anmeldung erfolgreich!");
      return response;
    }
    if (response.status === 400) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function userLogout() {
  try {
    const response = await fetch("https://wabooo-server.onrender.com/logout", {
      credentials: "include",
    });
    if (response.status === 201) {
      return console.log(response);
    }
    throw new Error("Logout fehlgeschlagen!");
  } catch (error) {
    console.log(error);
  }
}
