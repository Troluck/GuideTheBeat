import Axios from "./caller.service";

function login(credential) {
  return Axios.post("/login", credential);
}

function logout(credential) {
  localStorage.removeItem("token");
}

function saveToken(token) {
  localStorage.setItem("token", token);
}

function isLogged() {
  let token = localStorage.getItem("token");
  return !!token;
}

export const accountService = {
  login,
  logout,
  saveToken,
  isLogged,
};
