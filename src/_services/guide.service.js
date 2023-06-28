import Axios from "./caller.service";

function getAllGuides() {
  return Axios.get("/allGuides");
}
function addGuide(credential) {
  return Axios.post("/addGuide", credential);
}



export const guideService = {
  getAllGuides,
  addGuide
  
};
