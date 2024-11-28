import Axios from "./caller.service";

function addRating(credential) {
  console.log(credential);
  return Axios.post("/addRating", credential);
}

function getRatingGuide(id) {
  return Axios.get(`/allRatingGuide/${id}`);
}

export const RatingService = {
  addRating,
  getRatingGuide,
};
