<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
import ModalProfil from "../components/ModalProfil.vue";
export default {
  name: "HomePage",
  components: {
    modale: ModalProfil,
  },
  data() {
    return {
      token: null,
      userData: [],
      modalOpen: false,
    };
  },
  mounted() {
    this.GetUser();
  },
  methods: {
    toogleModale: function () {
      this.modalOpen = !this.modalOpen;
    },
    GetUser() {
      userService
        .getUser()
        .then((res) => {
          this.userData = res.data.user.map((user) => ({
            ...user,
          }));
          this.userData = this.userData[0];
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<template>
  <header>
    <img src="../../public/img/logo.svg.svg" class="logo" />
    <div class="profil" @click="toogleModale">
      <p class="usernameText">
        {{ userData.username ? userData.username.charAt(0) : "" }}
      </p>
    </div>
  </header>
  <modale
    :userData="userData"
    :modaleOpen="modalOpen"
    :toogleModale="toogleModale"
  />
</template>

<style>
@media (max-width: 767px) {
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 7%;
    margin-right: 7%;
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
}

@media (min-width: 768px) {
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
  }

  .logo {
    width: 8vh;
  }

  .profil {
    background-color: red;
    width: 6vh;
    height: 6vh;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }

  .usernameText {
    font-size: 120%;
  }
}
</style>
