<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
import { categoryService } from "../_services/category.service";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
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

      isEmailValid: true,
      hasDigit: false,
      hasUppercase: false,
      hasSpecialChar: false,
      hasMinLength: false,
      toast: null,
      isUserNameExist: null,
      passwordVisible: false,
    };
  },
  mounted() {
    this.AllCategory();
    this.toast = useToast();
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
          this.toogleModale(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 421) {
            this.toast.error("l'utilisateur existe déja ");
          }
          if (err.response && err.response.status === 420) {
            this.toast.error("l'email existe déja ");
          }
          if (err.response && err.response.status === 422) {
            this.toast.error("mot de passe non conforme");
          }
          if (err.response && err.response.status === 423) {
            this.toast.error("email non conforme");
          }
          this.validateEmail();
        });
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
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = emailRegex.test(this.user.email);
      if (!this.isEmailValid) {
        this.toast.error("email non conforme ");
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
  computed: {
    isPasswordValid() {
      const password = this.user.password;
      this.hasDigit = /\d/.test(password);
      this.hasUppercase = /[A-Z]/.test(password);
      this.hasSpecialChar = /\W/.test(password);
      this.hasMinLength = password.length >= 8;
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
            required
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="user.email"
            placeholder="E-mail"
            required
          />
        </div>

        <div class="form-group">
          <input
            class="form-control"
            v-model="user.password"
            placeholder="mot de passe"
            @input="isPasswordValid"
            :type="passwordVisible ? 'text' : 'password'"
            required
          />
          <span class="toggle-password" @click="togglePasswordVisibility">
            <i v-if="passwordVisible" class="fas fa-eye-slash"></i>
            <i v-else class="fas fa-eye"></i>
          </span>
        </div>
        <div class="password-validation">
          <div :class="{ 'green-text': hasDigit, 'red-text': !hasDigit }">
            Au moins un chiffre
          </div>
          <div :class="{ 'green-text': hasUppercase, 'red-text': !hasUppercase }">
            Au moins une majuscule
          </div>
          <div :class="{ 'green-text': hasSpecialChar, 'red-text': !hasSpecialChar }">
            Au moins un caractère special
          </div>
          <div :class="{ 'green-text': hasMinLength, 'red-text': !hasMinLength }">
            Au moins 8 caractères
          </div>
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
        <div class="editorDiv">
          <h3 class="editorText">Voulez vous être redacteur ?</h3>
          <label class="toggle">
            <input type="checkbox" class="form-control-editor" v-model="user.role" />
            <span class="toggle-button"></span>
          </label>
        </div>

        <input type="submit" class="form-submit" value="S'inscrire" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  position: relative;
}
.toggle-password {
  position: absolute;
  top: 25%;
  right: 12%;
  color: white;
  cursor: pointer;
}

.red-text {
  color: red;
}
.green-text {
  color: green;
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
.toggle input[type="checkbox"]:checked + .toggle-button {
  transform: translateX(26px);
  background-color: #14f195;
}

.toggle input[type="checkbox"] {
  display: none;
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

.editorDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5%;
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
