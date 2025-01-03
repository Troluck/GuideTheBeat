import Axios from "./caller.service";

function getAllGuides() {
  return Axios.get("/allGuides");
}
function getGuideTitleId(title, id) {
  return Axios.get(`/getGuide/${title}/${id}`);
}
function getGuide(id) {
  return Axios.get(`/getGuide/${id}`);
}
function addGuide(credential) {
  console.log(credential);
  return Axios.post("/addGuide", credential);
}
function updateGuide(guideId, credential) {
  console.log(guideId, credential);
  return Axios.put(`/updateGuide/${guideId}`, credential);
}
function deleteGuide(guideId) {
  return Axios.delete(`/deleteGuide/${guideId}`);
}

export const guideService = {
  getAllGuides,
  addGuide,
  getGuide,
  getGuideTitleId,
  updateGuide,
  deleteGuide,
};
