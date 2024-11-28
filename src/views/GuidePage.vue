<script>
import { guideService } from "../_services/guide.service";
import { CommentService } from "../_services/comment.service";
import { userService } from "../_services/user.service";
import { format } from "date-fns";
import { RatingService } from "../_services/rating.service";
import header from "../components/header.vue";
import footer from "../components/footer.vue";
export default {
  name: "GuidePage",
  components: {
    HeaderPage: header,
    footerPage: footer,
  },
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
      ratingData: {
        rate: null,
        guide: "",
        user: "",
      },
      userRating: null,
      ImgUrlGuide: "http://localhost:3000/",
      selectedRating: null,
      hasrated: false,
    };
  },
  beforeMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      console.log(id);
      await this.GetUser();
      this.getGuide(id);
      this.getCommentGuide(id);
      this.getRatingGuide();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    GetUser() {
      return userService
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
          this.commentData.text = "";
          let textarea = this.$refs["inputComment"];
          textarea.style.height = "18px";
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

    addRating(index) {
      this.ratingData.rate = index;
      this.ratingData.guide = this.guide._id;
      this.ratingData.user = this.userData[0]._id;
      RatingService.addRating(this.ratingData)
        .then((res) => {
          console.log(res.data);
          this.getRatingGuide();
          this.hasrated = true;
        })
        .catch((err) => console.log(err));
    },

    getRatingGuide() {
      RatingService.getRatingGuide(this.$route.params.id)
        .then((res) => {
          console.log(res.data);

          const userRating = res.data.ratingguide.find(
            (rating) => rating.user === this.userData[0]._id
          );

          if (userRating) {
            console.log("Vous avez déjà noté ce guide");
            this.userRating = userRating;
            this.hasRatedGuide = true;
          }
        })
        .catch((err) => console.log(err));
    },

    formatDate(dateTime) {
      const formattedDate = format(new Date(dateTime), "dd/MM/yyyy");
      return `${formattedDate}`;
    },
    resize() {
      let element = this.$refs["inputComment"];
      element.style.height = "25px";
      element.style.height = element.scrollHeight + "px";
    },
    displayRating(rating) {
      const fullStar = '<i class="fas fa-star" style="color:gold;"></i>';
      const emptyStar = '<i class="far fa-star"></i>';
      const roundedRating = Math.round(rating);

      const stars = fullStar.repeat(roundedRating);

      const emptyStars = emptyStar.repeat(5 - roundedRating);

      return `${stars}${emptyStars}`;
    },
  },
};
</script>
<template>
  <HeaderPage />
  <div class="guidePage">
    <div class="guide-container">
      <div class="cardGuideSolo">
        <span class="categoryGuide">#{{ category.label }}</span>
        <h3 class="titleGuide">{{ guide.title }}</h3>
        <span class="userGuide">ecrit par {{ user.username }}</span>
        <div class="imgGuide-container" v-if="guide.img">
          <img class="imgGuide" :src="ImgUrlGuide + guide.img" />
        </div>

        <p class="subtitleGuide">{{ guide.subtitle }}</p>

        <div class="contentGuideP" v-html="guide.content"></div>
      </div>
      <div class="rating">
        <div class="addRating" v-if="!userRating && !hasrated">
          <p>Ajouter une note à ce guide</p>
          <div>
            <i
              v-for="index in 5"
              :key="index"
              style="color: pointer"
              class="fas fa-star"
              :class="{ filled: index <= selectedRating }"
              @mouseover="selectedRating = index"
              @mouseleave="selectedRating = index"
              @click="addRating(index)"
            ></i>
          </div>
        </div>
        <div class="addRating" v-else-if="hasrated">Merci pour la notation</div>
        <div class="addRating" v-else>Vous avez déja noté ce guide</div>
      </div>
      <div class="globalNotation addRating">
        <div class="starNotation" v-html="displayRating(guide.averageRating)"></div>
        <span v-if="guide.rating !== undefined">{{ guide.rating.length }} notes</span>
      </div>

      <h3 style="color: var(--color-text-light); font-size: 30px">Commentaires</h3>
      <form class="addComment" @submit.prevent="addComment">
        <label for="comment"></label>

        <textarea
          @input="resize()"
          ref="inputComment"
          class="inputComment"
          id="comment"
          v-model="commentData.text"
        ></textarea>

        <input type="submit" class="form-submit" value="ajouter" />
      </form>
      <div class="comment">
        <div class="cardGuide" v-for="comments in comment">
          <div class="topComment">
            <div class="nameComment">{{ comments.user.username }}</div>
            <div class="dateComment">le {{ formatDate(comments.user.createdAt) }}</div>
          </div>
          <div class="bottomComment">{{ comments.text }}</div>
        </div>
      </div>
    </div>
  </div>
  <footerPage />
</template>
<style scoped>
.rating {
  display: flex;
}
.addRating {
  font-size: 150%;
  color: var(--color-text-light);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.filled {
  color: gold;
}
.guide-container {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cardGuideSolo {
  width: 50%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
  background-color: var(--color-secondary);
  color: var(--color-text-light);
}
.comment {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.form-submit {
  background-color: var(--color-secondary);
  border: none;
  text-align: center;
  padding: 10px;
  font-size: 120%;
  border-radius: 30px;
  margin-bottom: 7%;
  outline: none;
  cursor: pointer;
  color: var(--color-text-light);
  font-family: "Josefin Sans", sans-serif;
}
.addComment {
  text-align: center;
  align-items: center;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.inputComment {
  background-color: var(--color-text-light);
  width: 50%;
  border-radius: 30px;
  border: none;
  outline: none;
  margin-bottom: 3%;
  color: var(--color-text-dark);
  font-size: 120%;
  font-family: "Didact Gothic", sans-serif;
  padding-left: 2%;
  resize: none;
  min-height: 25px;
  overflow-y: hidden;
}
.topComment {
  margin-top: 5%;
  display: flex;
  width: 100%;
}

.bottomComment {
  display: flex;
  align-self: flex-start;
  margin-left: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
}

.cardGuide {
  width: 30%;
  background-color: var(--color-primary);
  padding-left: 1%;
  padding-right: 1%;
  border-radius: 20px;
  margin-bottom: 2%;
}
.dateComment {
  margin-left: 3%;
}
.contentGuideP span {
  max-width: 800px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.contentGuideP p {
  font-size: 20px;
}
.contentGuideP {
  width: 90%;
  font-size: 120%;
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
  margin-top: -20%;
}

.userGuide {
  font-size: 20px;
  align-self: flex-end;
  margin-right: 5%;
  margin-bottom: 5%;
}

.subtitleGuide {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 95%;
  height: 20%;
  font-size: 30px;
  margin-top: -5%;
}

.categoryGuide {
  align-self: flex-start;
  margin-left: 5%;
  margin-top: 5%;
}
.titleGuide {
  width: 90%;
  font-size: 50px;
  margin-bottom: 0;
  height: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1200px) {
  .inputComment {
    width: 100%;
  }
  .addComment {
    width: 50%;
  }
  .cardGuide {
    width: 50%;
  }
}
@media (max-width: 900px) {
  .cardGuide {
    width: 50%;
  }
}
@media (max-width: 650px) {
  .addComment {
    width: 80%;
  }
  .inputComment {
    width: 100%;
  }
}
@media (max-width: 600px) {
  .cardGuideSolo {
    width: 95%;
  }
  .cardGuide {
    width: 80%;
  }
}
</style>
