<script>
import "vue-toastification/dist/index.css";
import { accountService } from "../_services/account.service";
import { categoryService } from "../_services/category.service";
import { userService } from "../_services/user.service";
import ModalProfil from "../components/ModalProfil.vue";

export default {
  name: "header",
  props: ["modaleOpen", "toogleModale", "userData"],
  components: {
    modale: ModalProfil,
  },

  data() {
    return {
      userData: [],
      categories: [],
      isChecked: false,
      modalOpen: false,
      toast: null,
    };
  },
  mounted() {
    this.GetUser();
  },

  methods: {
    toogleModale: function () {
      this.modalOpen = !this.modalOpen;
    },
    toHomePage() {
      this.$router.push("/home");
    },

    GetUser() {
      userService
        .getUser()

        .then((res) => {
          this.userData = res.data.user.map((user) => ({
            ...user,
          }));
          this.userData = this.userData[0];
          this.isEditor = this.userData.role === "editor";
          console.log(userData.guide);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<template>
  <header>
    <div class="headerHome">
      <img @click="toHomePage()" src="../../public/img/logo.svg.svg" class="logo" />
      <div class="profil" @click="toogleModale">
        <p class="usernameText">
          {{ userData.username ? userData.username.charAt(0) : "" }}
        </p>
      </div>
    </div>
    <modale
      :userData="userData"
      :modaleOpen="modalOpen"
      :toogleModale="toogleModale"
      @role-updated="handleRoleUpdated"
    />
  </header>
</template>

<style scoped>
.headerHome {
  width: 80%;
  display: flex;
  justify-content: space-between;

  margin-top: 5%;
}
.logo {
  width: 6vh;
}

.profil {
  background-color: red;
  width: 5vh;
  height: 5vh;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
.usernameText {
  font-size: 100%;
}
</style>
