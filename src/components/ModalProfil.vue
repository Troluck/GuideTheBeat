<script>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { accountService } from "../_services/account.service";
import { categoryService } from "../_services/category.service";
import { userService } from "../_services/user.service";

export default {
  name: "ModalRegister",
  props: ["modaleOpen", "toogleModale", "userData"],

  data() {
    return {
      user: {
        username: this.userData.username,
        email: this.userData.email,
        role: this.userData.role,
        category: [],
      },
      categories: [],
      isChecked: false,
      toast: null,
    };
  },
  mounted() {
    this.AllCategory();
    console.log(this.userData.username);
    console.log(this.userData._id);
    this.toast = useToast();
  },
  methods: {
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

    UpdateUser() {
      if (this.user.isEditor) {
        this.user.role = "editor";
      } else {
        this.user.role = null;
      }
      userService
        .updateUser(this.userData._id, this.user)
        .then((res) => {
          console.log(res.data);
          this.toast.success("Vos données ont été modifiées avec succès !");
        })
        .catch((err) => console.log(err));
      this.$emit("role-updated", this.user.role);
    },
  },

  watch: {
    userData: {
      immediate: true,
      handler(newUserData) {
        if (newUserData) {
          this.user.username = newUserData.username;
          this.user.email = newUserData.email;
          this.user.role = newUserData.role;
          this.user.category = newUserData.category;

          if (this.user.category) {
            this.user.category.forEach((categoryId) => {
              const category = this.categories.find(
                (c) => c._id === categoryId
              );
              if (newUserData.role === "editor") {
                this.user.isEditor = true;
              } else {
                this.user.isEditor = false;
              }
            });
          }
        }
      },
    },
  },
};
</script>
<template>
  <div class="modal" v-if="modaleOpen" style="z-index: 5">
    <div class="overlay">
      <div class="quite" @click="toogleModale">X</div>
      <h2>Profil</h2>
      <form @submit.prevent="UpdateUser" class="formRegister">
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

        <h3>Choisissez vos catégories préférés</h3>
        <div class="categoryDiv">
          <label
            class="checkbox-button"
            :class="{ checked: user.category.includes(category._id) }"
            v-for="category in categories"
            :key="category._id"
          >
            <input
              type="checkbox"
              v-model="user.category"
              :value="category._id"
            />
            <span>{{ category.label }}</span>
          </label>
        </div>
        <div class="editorDiv">
          <p class="editorText">Mode rédacteur</p>
          <label class="toggle">
            <input
              type="checkbox"
              class="form-control-editor"
              v-model="user.isEditor"
            />
            <span class="toggle-button"></span>
          </label>
        </div>
        <input type="submit" class="form-submitEdit" value="Modifier" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-submitEdit {
  background-color: var(--color-secondary);
  border: none;
  text-align: center;
  padding: 10px;
  font-size: 5vw;
  width: 50%;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
}
.editorText {
  font-size: 1.5rem;
  padding-right: 1.5rem;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 17px;
  overflow: hidden;
  cursor: pointer;
}

.toggle-button {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 30px;
  height: 30px;
  background-color: #ff0000;
  border-radius: 50%;
  transition: transform 0.3s, background-color 0.3s;
}

.toggle input[type="checkbox"]:checked + .toggle-button {
  transform: translateX(26px);
  background-color: #14f195;
}

.toggle input[type="checkbox"] {
  display: none;
}

.guide-button {
  margin-top: 5%;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  border: none;
  text-align: center;
  padding: 10px;
  font-size: 5vw;
  width: 50%;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
}

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
  margin: 5% 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
}

.editorDiv {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Josefin Sans", sans-serif;
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

  .form-control {
    width: 80%;
  }

  .form-submit,
  .guide-button {
    width: 40%;
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
