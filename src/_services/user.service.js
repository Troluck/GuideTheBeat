import Axios from "./caller.service";

function getAllUser() {
  return Axios.get("/allUsers");
}

function getUser() {
  const token = localStorage.getItem("token");
  console.log(token);
  return Axios.get(`/findUserToken/${token}`);
}

function updateUser(userId, credential) {
  console.log(userId, credential);
  return Axios.put(`/updateUser/${userId}`, credential);
}

export const userService = {
  getAllUser,
  getUser,
  updateUser,
};
