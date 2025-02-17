import { Username, Password, UserCredentials } from "../types/etypes";

const authUser = async (username: Username, password: Password) => {
  try {
    console.log("userService.js | authUser", username, password);
    const response = await fetch("/auth/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.text(); //figure out the shape of result
  } catch (error) {
    console.error("Error authenticating user:", error);
  }
};

export default authUser;
