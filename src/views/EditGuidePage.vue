<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
import ModalProfil from "../components/ModalProfil.vue";
import EditGuide from "../components/EditGuide.vue";
export default {
  name: "EditGuidePage",
  components: {
    EditGuide:EditGuide,
  },
  data() {
    return {
      token: null,
      userData: [],
      modalOpen: false,
      isEditor: false,
    };
  },
  mounted() {
 
    
  },
  methods: {
    toogleModale: function () {
      this.modalOpen = !this.modalOpen;
    },
   
  
  },
};
</script>



<template>
  <header>
    <div class="headerHome">
    <img src="../../public/img/logo.svg.svg" class="logo" />
    <div class="profil" @click="toogleModale">
      <p class="usernameText">
        {{ userData.username ? userData.username.charAt(0) : "" }}
      </p>
    </div>
    </div>
  </header>
<h1>Ecrire Guide</h1>
<EditGuide/>
</template>

<style>
@media (max-width: 767px) {
  .headerHome {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 7%;
    margin-right: 7%;
    margin-top: 5%;
  }
  h1{
    text-align: center;
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
  .guideButton {
    margin: 0;
    padding: 2%;
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
