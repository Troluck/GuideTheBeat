<script>
import { guideService } from "../_services/guide.service";

export default {
  name: "GuidePage",
  data() {
    return {
      guide: [],
      user: {},
      category: {},
      ImgUrlGuide: "http://localhost:3000/",
    };
  },
  mounted() {
    const id = this.$route.params.id;
    console.log(id);
    this.getGuide(id);
  },
  methods: {
    getGuide(id) {
      guideService
        .getGuide(id)
        .then((res) => {
          this.guide = res.data.guide[0];
          this.user = res.data.guide[0].user;
          this.category = res.data.guide[0].category[0];
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<template>
  <div class="guidePage">
    <header>
      <img src="../../public/img/logo.svg.svg" class="logo" />
    </header>
    <div class="guide-container">
      <div class="cardGuideSolo">
        <span class="categoryGuide">#{{ category.label }}</span>
        <h3 class="titleGuide">{{ guide.title }}</h3>
        <div class="imgGuide-container" v-if="guide.img">
          <img class="imgGuide" :src="ImgUrlGuide + guide.img" />
        </div>

        <p class="subtitleGuide">{{ guide.subtitle }}</p>
        <span class="userGuide">{{ user.username }}</span>
        <div class="contentGuide">
          <div class="contentGuideP" v-html="guide.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.guide-container {
  margin-top: 15%;
  display: flex;
  justify-content: center;
}
.cardGuideSolo {
  max-width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1%;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
  background-color: var(--color-primary);
}
.contentGuideP span {
  max-width: 800px;
  margin-top: 20px;
  margin-bottom: 20px;
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
</style>
