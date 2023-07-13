<script>
import "vue-toastification/dist/index.css";

export default {
  name: "ModalProfil",
  props: ["modaleOpen", "toogleModale", "userData"],

  data() {
    return {
      user: {
        username: this.userData.username,
        role: this.userData.role,
        category: [],
      },
      categories: [],
      isChecked: false,
    };
  },
  mounted() {
    // this.AllCategory();
    // console.log(this.userData.username);
    // console.log(this.userData._id);
    // this.toast = useToast();
  },
  methods: {
    Logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    // AllCategory() {
    //   categoryService
    //     .getAllCategory()
    //     .then((res) => {
    //       this.categories = res.data.category.map((category) => ({
    //         ...category,
    //       }));
    //     })
    //     .catch((err) => console.log(err));
    // },
    // UpdateUser() {
    //   if (this.user.isEditor) {
    //     this.user.role = "editor";
    //   } else {
    //     this.user.role = null;
    //   }
    //   userService
    //     .updateUser(this.userData._id, this.user)
    //     .then((res) => {
    //       console.log(res.data);
    //       this.toast.success("Vos données ont été modifiées avec succès !");
    //     })
    //     .catch((err) => console.log(err));
    //   this.$emit("role-updated", this.user.role);
    // },
  },

  // watch: {
  //   userData: {
  //     immediate: true,
  //     handler(newUserData) {
  //       if (newUserData) {
  //         this.user.username = newUserData.username;
  //         this.user.email = newUserData.email;
  //         this.user.role = newUserData.role;
  //         this.user.category = newUserData.category;

  //         if (this.user.category) {
  //           this.user.category.forEach((categoryId) => {
  //             const category = this.categories.find(
  //               (c) => c._id === categoryId
  //             );
  //             if (newUserData.role === "editor") {
  //               this.user.isEditor = true;
  //             } else {
  //               this.user.isEditor = false;
  //             }
  //           });
  //         }
  //       }
  //     },
  //   },
  // },
};
</script>
<template>
  <div class="modal" v-if="modaleOpen" style="z-index: 5">
    <div class="modal-header">
      <div class="profil-left">
        <div class="profil">
          <p class="usernameText">
            {{ userData.username ? userData.username.charAt(0) : "" }}
          </p>
        </div>
        <p class="username">{{ userData.username }}</p>
      </div>
      <i class="fa-solid fa-xmark close" @click="toogleModale"></i>
    </div>
    <div class="modal-middle">
      <p>Modifier Profil</p>
      <p>Ecrire un guide</p>
      <p>Mes Guides</p>
      <div class="logout-div" @click="Logout()">Deconnexion</div>
    </div>

    <!-- <div class="overlay">
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
    </div>-->
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 5;
  right: 0%;
  top: 0%;
  min-width: 230px;
  height: 100%;
  background-color: var(--color-background);
  color: white;
  animation-name: slidein;
  animation-duration: 300ms;
}
@keyframes slidein {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
}

.modal-middle {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10%;
}
.modal-middle p {
  font-size: 20px;
  margin-top: 5%;
}
.close {
  cursor: pointer;
}
.modal-header {
  display: flex;
  margin-top: 5%;
  margin-right: 10%;
  justify-content: space-between;
  align-items: center;
}
.profil-left {
  display: flex;
  align-items: center;
  margin-left: 5%;
}
.username {
  font-size: 1em;
  margin-left: 1em;
}
</style>
