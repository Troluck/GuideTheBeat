<script>
import { accountService } from "../_services/account.service";
import { categoryService } from "../_services/category.service";
export default {
  name: "ModalRegister",
  props: ["modaleOpen", "toogleModale"],
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        role: "",
        category: [],
      },
      categories: [],
      isChecked: false,
    };
  },
  mounted() {
    this.AllCategory();
  },
  methods: {
    register() {
      this.user.role = this.user.role ? "editor" : null;

      this.user.category = this.categories
        .filter((category) => category.isChecked)
        .map((category) => category._id);

      accountService
        .register(this.user)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },

    AllCategory() {
      categoryService
        .getAllCategory()
        .then((res) => {
          this.categories = res.data.category.map((category) => ({
            ...category,
          }));
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<template>
  <div class="modal" v-if="modaleOpen" style="z-index: 5">
    <div class="overlay">
      <div class="quite" @click="toogleModale">X</div>
      <h2>Inscription</h2>
      <form @submit.prevent="register" class="formRegister">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="user.username"
            placeholder="Nom"
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="user.email"
            placeholder="E-mail"
          />
        </div>

        <div class="form-group">
          <input
            type="password"
            class="form-control"
            v-model="user.password"
            placeholder="mot de passe"
          />
        </div>

        <h3>Choisissez vos catégories préférés</h3>
        <div class="categoryDiv">
          <label
            class="checkbox-button"
            :class="{ checked: category.isChecked }"
            v-for="category in categories"
            :key="category._id"
          >
            <input type="checkbox" v-model="category.isChecked" />
            <span>{{ category.label }}</span>
          </label>
        </div>
        <div class="form-group editorDiv">
          <label>Voulez être rédacteur ?</label>
          <input
            type="checkbox"
            class="form-control-editor"
            v-model="user.role"
          />
        </div>

        <input type="submit" class="form-submit" value="S'inscrire" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  font-family: "Josefin Sans", sans-serif;
}

.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #80ecff;
  position: fixed;
  border-radius: 5%;
  width: 80%;
}

.formRegister {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-group {
  display: flex;
  justify-content: center;
  width: 100%;
}

.checkbox-button {
  border-radius: 4px;
  padding: 6px 12px;
  margin-bottom: 5%;
  cursor: pointer;
  background-color: #f3f3f3;
  border-radius: 50px;
  display: flex;
  justify-content: center;
}

.checkbox-button input[type="checkbox"] {
  display: none;
}

.checkbox-button.checked {
  background-color: #14f195;
}

.checkbox-button span {
  margin-left: 6px;
}

.categoryDiv {
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
}

.editorDiv {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-control-editor {
  width: 80%;
  height: 20px;
  border-radius: 50px;
}

.quite {
  background-color: #ff0000;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
}

/* Responsive Styles */
@media (min-width: 768px) {
  .overlay {
    width: 60%;
  }
}

@media (min-width: 1024px) {
  .overlay {
    width: 40%;
  }
}

@media (min-width: 1200px) {
  .overlay {
    width: 30%;
  }
}

@media (max-width: 480px) {
  .overlay {
    width: 90%;
  }
}

@media (max-width: 360px) {
  .overlay {
    width: 95%;
  }
}
</style>
