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
    closeModal() {
      this.$emit("toogleModale");
    },
  },
};
</script>
<template>
  <transition name="modal-slide">
    <div class="modal" v-if="modaleOpen" style="z-index: 5">
      <div class="modal-header">
        <div class="profil-left">
          <div class="profil"></div>
          <p class="username">{{ userData.username }}</p>
        </div>
        <i class="fa-solid fa-xmark close" @click="toogleModale"></i>
      </div>
      <div class="modal-middle">
        <p @click="toProfilPage()" style="cursor: pointer">Modifier Profil</p>
        <p
          @click="toCreateGuide()"
          v-if="userData.role === 'editor'"
          style="cursor: pointer"
        >
          Ecrire un guide
        </p>
        <p v-if="userData.role === 'editor'">Mes Guides</p>
        <div class="logout-div" @click="Logout()" style="cursor: pointer">
          Deconnexion
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 5;
  right: 0%;
  top: 0%;
  min-width: 230px;
  height: 30%;
  background-color: var(--color-secondary);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  color: white;
  animation-name: slidein;
  animation-duration: 300ms;
}
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 300ms;
}

.modal-slide-enter,
.modal-slide-leave-to {
  transform: translateX(100%);
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
