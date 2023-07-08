<script>
import { guideService } from "../_services/guide.service";
import { CommentService } from "../_services/comment.service";
import { userService } from "../_services/user.service";
import { format } from "date-fns";

export default {
  name: "GuidePage",
  data() {
    return {
      userData: [],
      guide: [],
      user: {},
      category: {},
      comment: null,
      commentData: {
        text: "",
        guide: "",
        user: "",
      },
      ImgUrlGuide: "http://localhost:3000/",
    };
  },
  mounted() {
    const id = this.$route.params.id;
    console.log(id);
    this.GetUser();
    this.getGuide(id);
    this.getCommentGuide(id);
  },
  methods: {
    GetUser() {
      userService
        .getUser()
        .then((res) => {
          this.userData = res.data.user.map((user) => ({
            ...user,
          }));
        })
        .catch((err) => console.log(err));
    },
    getGuide(id) {
      guideService
        .getGuide(id)
        .then((res) => {
          this.guide = res.data.guide[0];
          this.user = res.data.guide[0].user;
          this.category = res.data.guide[0].category[0];

          console.log(this.guide);
        })
        .catch((err) => console.log(err));
    },
    getCommentGuide(id) {
      CommentService.getCommentGuide(id)
        .then((res) => {
          this.comment = res.data.commentguide;

          console.log(this.comment);
        })
        .catch((err) => console.log(err));
    },

    addComment() {
      this.commentData.guide = this.guide._id;
      this.commentData.user = this.userData[0]._id;

      CommentService.addComment(this.commentData)
        .then((res) => {
          console.log(res.data);
          this.getCommentGuide(this.$route.params.id);
        })
        .catch((err) => console.log(err));
    },
    formatDate(dateTime) {
      const formattedDate = format(new Date(dateTime), "dd/MM/yyyy");
      return `${formattedDate}`;
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
        <div class="commentDiv">
          <form @submit.prevent="addComment">
            <label for="comment">Ecrire un commentaire:</label>
            <input type="text" id="comment" v-model="commentData.text" />
            <input type="submit" class="form-submit" value="ajouter" />
          </form>
          <div class="comment">
            <div class="cardGuide" v-for="comments in comment">
              {{ comments.text }} {{ comments.user.username }}
              {{ formatDate(comments.user.createdAt) }}
            </div>
          </div>
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
