import Axios from "./caller.service";

function getAllCategory() {
  return Axios.get("/getAllCategory");
}

export const categoryService = {
  getAllCategory,
};
