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
      <div class="logotextDiv">
        <img @click="toHomePage()" src="../../public/img/logo.svg.svg" class="logo" />
        <h1>Guide the Beat</h1>
      </div>
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
header {
  margin-top: 2%;
}
.headerHome {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}
.logotextDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 5vh;
  font-family: "Josefin Sans", sans-serif;
  color: var(--color-text-light);
}

.logo {
  width: 20vh;
}

.profil {
  background-color: red;
  width: 70px;
  height: 70px;
  position: absolute;
  display: flex;
  right: 10%;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
}
.usernameText {
  font-size: 30px;
  margin-top: 50%;
}

@media (max-width: 1200px) {
  .profil {
    width: 50px;
    height: 50px;
  }
  .usernameText {
    font-size: 20px;
  }
}
@media (max-width: 900px) {
  .headerHome {
    justify-content: flex-start;
  }
  .logotextDiv {
    flex-direction: row;
    justify-content: flex-start;
    width: 80%;
  }
  .logo {
    width: 13vh;
  }
  h1 {
    font-size: 4vh;
    margin-left: 4%;
  }
}
@media (max-width: 900px) {
  .logo {
    width: 10vh;
  }
  h1 {
    font-size: 3vh;
  }
}
@media (max-width: 600px) {
  .logo {
    width: 8vh;
  }
  h1 {
    display: none;
  }
}
</style>
