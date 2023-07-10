<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
import { guideService } from "../_services/guide.service";
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
      guides: [],
      modalOpen: false,
      isEditor: false,
      ImgUrlGuide: "http://localhost:3000/",
      showUserGuides: true,
    };
  },
  mounted() {
    this.GetUser();
    this.GetAllGuides();
  },
  methods: {
    toogleModale: function () {
      this.modalOpen = !this.modalOpen;
    },

    GetUserGuides() {
      if (this.showUserGuides) {
        this.guides = this.guides.filter((guide) => this.isUserGuide(guide));
      } else {
        this.GetAllGuides();
      }
      this.showUserGuides = !this.showUserGuides;
    },

    isUserGuide(guide) {
      return guide.user._id === this.userData._id;
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
    GetAllGuides() {
      guideService
        .getAllGuides()
        .then((res) => {
          this.guides = res.data.guide.map((guides) => ({
            ...guides,
          }));
        })

        .catch((err) => console.log(err));
    },
    isUserGuide(guide) {
      return guide.user._id === this.userData._id;
    },

    handleRoleUpdated(newRole) {
      this.isEditor = newRole === "editor";
    },
    goToEditGuidePage(guidename) {
      if (guidename) {
        const formattedGuidename = guidename.replace(/ /g, "-");
        console.log(formattedGuidename);
        this.$router.push(`/editGuide/${formattedGuidename}`);
      } else {
        this.$router.push("/editGuide");
      }
    },
    goToCreateGuidePage() {
      this.$router.push(`/createguide`);
    },
    goToGuidePage(guideId) {
      this.$router.push(`/guide/${guideId}`);
    },
  },
};
</script>

<template>
  <header>
    <div class="headerHome">
      <img src="../../public/img/logo.svg.svg" class="logo" />

      <button
        v-if="isEditor"
        @click="goToCreateGuidePage()"
        class="guideButton"
      >
        Ecrire guide
      </button>
      <button v-if="isEditor" class="guideButton" @click="GetUserGuides()">
        {{ showUserGuides ? "Mes guides" : "Tous les guides" }}
      </button>
      <div class="profil" @click="toogleModale">
        <p class="usernameText">
          {{ userData.username ? userData.username.charAt(0) : "" }}
        </p>
      </div>
    </div>
  </header>
  <modale
    :userData="userData"
    :modaleOpen="modalOpen"
    :toogleModale="toogleModale"
    @role-updated="handleRoleUpdated"
  />
  <div class="cardList">
    <div
      class="cardGuide"
      v-for="guide in guides"
      @click="goToGuidePage(guide._id)"
    >
      <div class="topCard">
        <span class="categoryGuide">#{{ guide.category[0].label }}</span>
        <span
          class="myGuide"
          @click="goToGuidePage()"
          v-if="guide.user._id == userData._id"
          >Mon Guide</span
        >
      </div>
      <h3 class="titleGuide">{{ guide.title }}</h3>
      <div class="imgGuide-container">
        <img class="imgGuide" :src="ImgUrlGuide + guide.img" />
      </div>

      <p class="subtitleGuide">{{ guide.subtitle }}</p>
      <img
        @click.stop="goToEditGuidePage(guide.title)"
        class="userGuide modifyButton"
        v-if="guide.user._id == userData._id"
        src="../../public/img/modifyIcon.svg"
      />
      <span v-else class="userGuide">{{ guide.user.username }}</span>
    </div>
  </div>
</template>

<style>
.topCard {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.imgGuide-container {
  height: 50vw;
  overflow: hidden;
  margin-top: -6vw;
  margin-bottom: -8vw;
}
.imgGuide {
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: polygon(0 20%, 100% 20%, 100% 80%, 0 80%);
}

.userGuide {
  font-size: 5vw;
  align-self: flex-end;
  margin-right: 5%;
  margin-bottom: 5%;
}

.subtitleGuide {
  font-size: 5vw;
  text-align: center;
}

.categoryGuide {
  align-self: flex-start;
  margin-left: 5%;
  margin-top: 5%;
}
.myGuide {
  align-self: flex-end;
  margin-right: 5%;
  margin-top: 5%;
}
.titleGuide {
  font-size: 8vw;
  text-align: center;
  margin-bottom: 0%;
  margin-top: 6%;
}

.cardList {
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cardGuide {
  max-width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
  background-color: var(--color-primary);
  cursor: pointer;
}

@media (max-width: 767px) {
  .headerHome {
    width: 100%;
    display: flex;
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
