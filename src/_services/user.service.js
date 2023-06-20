import Axios from "./caller.service";

function getAllUser() {
  return Axios.get("/allUsers");
}

function getUser() {
  const token = localStorage.getItem("token");
  console.log(token);
  return Axios.get(`/findUserToken/${token}`);
}

export const userService = {
  getAllUser,
  getUser,
};
