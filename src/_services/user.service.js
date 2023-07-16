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

function checkUserName(userName) {
  console.log(userName);
  return Axios.get(`/usernameExiste/${userName}`);
}
function checkUserEmail(email) {
  console.log(email);
  return Axios.get(`/userEmailExiste/${email}`);
}

export const userService = {
  getAllUser,
  getUser,
  updateUser,
  checkUserName,
  checkUserEmail,
};
