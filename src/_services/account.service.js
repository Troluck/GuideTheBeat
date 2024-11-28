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

function register(credential) {
  return Axios.post("/registration", credential);
}

export const accountService = {
  login,
  logout,
  saveToken,
  isLogged,
  register,
};
