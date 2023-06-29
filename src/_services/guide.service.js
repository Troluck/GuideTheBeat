import Axios from "./caller.service";

function getAllGuides() {
  return Axios.get("/allGuides");
}
function getGuide(id) {
  return Axios.get(`/getGuide/${id}`);
}
function addGuide(credential) {
  console.log(credential);
  return Axios.post("/addGuide", credential);
}

export const guideService = {
  getAllGuides,
  addGuide,
  getGuide,
};
