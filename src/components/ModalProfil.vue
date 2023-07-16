<script>
import "vue-toastification/dist/index.css";

export default {
  name: "ModalProfil",
  props: ["modaleOpen", "toogleModale", "userData"],

  data() {
    return {
      categories: [],
      isChecked: false,
    };
  },
  mounted() {},
  methods: {
    Logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    toCreateGuide() {
      this.$router.push("/createGuide");
    },
    toProfilPage() {
      this.$router.push("/profilPage");
    },
  },
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
      <p @click="toProfilPage()">Modifier Profil</p>
      <p @click="toCreateGuide()">Ecrire un guide</p>
      <p>Mes Guides</p>
      <div class="logout-div" @click="Logout()">Deconnexion</div>
    </div>
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
