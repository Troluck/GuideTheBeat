<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
import { guideService } from "../_services/guide.service";
import header from "../components/header.vue";
import footer from "../components/footer.vue";
export default {
  name: "HomePage",
  components: {
    HeaderPage: header,
    footerPage: footer,
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
      searchQuery: "",
    };
  },
  beforeMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    }
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
    displayRating(rating) {
      const fullStar = '<i class="fas fa-star"style="color:gold;"></i>';
      const emptyStar = '<i class="far fa-star style="color:gold;"></i>';
      const roundedRating = Math.round(rating);

      const stars = fullStar.repeat(roundedRating);

      const emptyStars = emptyStar.repeat(5 - roundedRating);

      return `${stars}${emptyStars}`;
    },
  },
  computed: {
    filteredGuides() {
      return this.guides.filter(
        (guide) =>
          guide.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          guide.subtitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          guide.category[0].label
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          guide.user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<template>
  <HeaderPage />
  <div class="search-div">
    <div class="search-bar">
      <input type="text" placeholder="Rechercher..." v-model="searchQuery" />
    </div>
  </div>
  <div class="cardList-container">
    <div class="cardList">
      <div
        class="cardGuide"
        v-for="guide in filteredGuides"
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
        <div class="card-bottom">
          <img
            @click.stop="goToEditGuidePage(guide.title)"
            class="userGuide modifyButton"
            v-if="guide.user._id == userData._id"
            src="../../public/img/modifyIcon.svg"
          />
          <span v-else class="userGuide">{{ guide.user.username }}</span>
          <div class="notation">
            <div class="starNotation" v-html="displayRating(guide.averageRating)"></div>
            <span class="">{{ guide.rating.length }} notes</span>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" v-if="modalOpen" @click="toogleModale"></div>
  </div>
  <footerPage />
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
}
.search-div {
  display: flex;
  justify-content: center;
  margin-top: 4%;
}
.search-bar {
  border: 1px solid white;
  border-radius: 5px;
  width: 30%;
}

.search-bar input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 14px;
  outline: none;
}

.search-bar::before {
  content: "\f002";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  padding: 10px;
  color: gray;
  background-color: transparent;
}

.card-bottom {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
}
.notation {
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.topCard {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.imgGuide-container {
  width: 80%;
  height: 30%;
  overflow: hidden;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgGuide {
  width: 100%;
  display: flex;
  object-fit: contain;
  clip-path: polygon(0 20%, 100% 20%, 100% 80%, 0 80%);
}

.userGuide {
  align-self: flex-end;
  margin-right: 5%;
  margin-bottom: 5%;
}

.subtitleGuide {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 90%;
  height: 20%;
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
  width: 90%;
  height: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cardList-container {
  display: flex;
  justify-content: center;
}
.cardList {
  margin-top: 5%;
  width: 80%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.cardGuide {
  width: 350px;
  height: 350px;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
  background-color: var(--color-primary);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}
.cardGuide:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}

@media (max-width: 1600px) {
  .search-bar {
    width: 40%;
  }
}
@media (max-width: 900px) {
  .search-bar {
    width: 60%;
    margin-top: 4%;
  }
}
@media (max-width: 600px) {
  .search-bar {
    width: 80%;
    margin-top: 5%;
  }
}
@media (max-width: 400px) {
  .search-bar {
    width: 80%;
    margin-top: 6%;
  }
}
</style>
