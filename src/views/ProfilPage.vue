<script>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { accountService } from "../_services/account.service";
import { categoryService } from "../_services/category.service";
import { userService } from "../_services/user.service";
import header from "../components/header.vue";
import footer from "../components/footer.vue";
export default {
  name: "ProfilPage",
  components: {
    HeaderPage: header,
    footerPage: footer,
  },

  data() {
    return {
      userData: [],
      categories: [],
      isChecked: false,
      toast: null,
      user: {
        category: [],
        isEditor: false,
      },
    };
  },
  mounted() {
    this.GetUser();
    this.AllCategory();
    // console.log(this.userData.username);
    // console.log(this.userData._id);
    this.toast = useToast();
  },
  methods: {
    GetUser() {
      userService
        .getUser()

        .then((res) => {
          this.userData = res.data.user.map((user) => ({
            ...user,
          }));
          this.userData = this.userData[0];

          this.isEditor = this.userData.role === "editor";
          console.log(this.userData);
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

    UpdateUser() {
      if (this.user.isEditor) {
        this.userData.role = "editor";
      } else {
        this.userData.role = null;
      }
      userService
        .updateUser(this.userData._id, this.userData)
        .then((res) => {
          console.log(res.data);
          this.toast.success("Vos données ont été modifiées avec succès !");
        })
        .catch((err) => {
          console.log(err);

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
        });
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
          this.user.category = newUserData.category || [];
          if (this.user.category) {
            this.user.category.forEach((categoryId) => {
              const category = this.categories.find((c) => c._id === categoryId);
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
  <HeaderPage />
  <div class="profilDiv">
    <h2>Profil</h2>
    <form @submit.prevent="UpdateUser" class="formRegister">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Nom"
          v-model="userData.username"
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="E-mail"
          v-model="userData.email"
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
          <input type="checkbox" v-model="user.category" :value="category._id" />
          <span>{{ category.label }}</span>
        </label>
      </div>
      <div class="editorDiv">
        <p class="editorText">Mode rédacteur</p>
        <label class="toggle">
          <input type="checkbox" class="form-control-editor" />
          <span class="toggle-button"></span>
        </label>
      </div>
      <input type="submit" class="form-submitEdit" value="Modifier" />
    </form>
  </div>
  <footerPage />
</template>

<style scoped>
.profilDiv {
  background-color: var(--color-tertiary);
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 30px;
}
.form-submitEdit {
  background-color: var(--color-secondary);
  border: none;
  text-align: center;
  padding: 10px;
  font-size: 5vw;
  margin-bottom: 5%;
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
