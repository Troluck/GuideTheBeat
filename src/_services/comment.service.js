import Axios from "./caller.service";

function addComment(credential) {
  console.log(credential);
  return Axios.post("/addComment", credential);
}

function getCommentGuide(id) {
  return Axios.get(`/allCommentGuide/${id}`);
}

export const CommentService = {
  addComment,
  getCommentGuide,
};
