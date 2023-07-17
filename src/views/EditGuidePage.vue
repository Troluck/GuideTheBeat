<script>
import { categoryService } from "../_services/category.service";
import { userService } from "../_services/user.service";
import { guideService } from "../_services/guide.service";
import { useToast } from "vue-toastification";
import Editor from "@tinymce/tinymce-vue";
import header from "../components/header.vue";
import footer from "../components/footer.vue";
export default {
  name: "EditGuidePage",
  components: {
    HeaderPage: header,
    footerPage: footer,
  },

  data() {
    return {
      token: null,
      userData: [],
      guideData: [],
      categories: [],
      modalOpen: false,
      isEditor: false,
      ImgUrlGuide: "http://localhost:3000/",
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
    this.AllCategory();
    this.toast = useToast();
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
          }))[0];

          console.log(this.userData);

          if (this.$route.path.includes("/editGuide/")) {
            const formattedGuidename = this.$route.params.guidename;
            const guidename = formattedGuidename.replace(/-/g, "%20");
            console.log(this.userData._id);
            this.GetGuide(guidename, this.userData._id);
          }
        })
        .catch((err) => console.log(err));
    },

    GetGuide(title, id) {
      console.log(title);
      console.log(id);
      guideService
        .getGuideTitleId(title, id)

        .then((res) => {
          this.guideData = res.data.guide.map((guide) => ({
            ...guide,
          }))[0];

          console.log(this.guideData._id);
        })
        .catch((err) => console.log(err));
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.guide.image = file;
    },

    AllCategory() {
      categoryService
        .getAllCategory()
        .then((res) => {
          this.categories = res.data.category.map((category) => ({
            ...category,
          }));
        })
        .catch((err) => console.log(err));
    },

    UpdateGuide() {
      guideService
        .updateGuide(this.guideData._id, this.guideData)
        .then((res) => {
          console.log(res.data);
          this.toast.success("Vos données ont été modifiées avec succès !");
        })
        .catch((err) => console.log(err));
    },

    isCategoryChecked(categoryId) {
      if (
        this.guideData &&
        this.guideData.category &&
        Array.isArray(this.guideData.category)
      ) {
        return this.guideData.category.some((category) => category._id === categoryId);
      }
    },
    toggleCategory(categoryId) {
      if (
        this.guideData &&
        this.guideData.category &&
        Array.isArray(this.guideData.category)
      ) {
        const index = this.guideData.category.findIndex(
          (category) => category._id === categoryId
        );
        if (index !== -1) {
          this.guideData.category.splice(index, 1);
        } else {
          this.guideData.category.push({ _id: categoryId });
        }
      } else {
        this.guideData.category = [{ _id: categoryId }];
      }
    },
  },
};
</script>

<template>
  <HeaderPage />
  <modale :userData="userData" :modaleOpen="modalOpen" :toogleModale="toogleModale" />
  <h1>Modifier votre Guide</h1>
  <form @submit.prevent="UpdateGuide" enctype="multipart/form-data">
    <div>
      <label for="title">Titre:</label>
      <input type="text" id="title" v-model="guideData.title" />
    </div>
    <div class="categoryDiv">
      <label
        class="checkbox-button"
        :class="{ checked: isCategoryChecked(category._id) }"
        v-for="category in categories"
        :key="category._id"
      >
        <input
          type="checkbox"
          v-model="guideData.category"
          :value="category._id"
          @change="toggleCategory(category._id)"
        />
        <span>{{ category.label }}</span>
      </label>
    </div>
    <div>
      <img class="imgGuide" :src="ImgUrlGuide + guideData.img" />
      <label for="img">Image:</label>
      <input type="file" id="image" name="image" @change="handleImageUpload" />
    </div>
    <div>
      <label for="subtitle">Sous-titre:</label>
      <input type="text" id="subtitle" v-model="guideData.subtitle" />
    </div>
    <div>
      <label for="content">Contenu:</label>
      <editor
        id="content"
        v-model="guideData.content"
        api-key="dyy79gbkx5vbfglwor07844fgibmii20hspid29qz8qzhfeh"
        :init="{
          height: 500,
          menubar: false,
          plugins: [],
          toolbar:
            'alignleft aligncenter alignright alignjustify | fontsizeinput| formatselect | bold italic backcolor \
            | h1| h2| h3\
            bullist numlist outdent indent | removeformat | help',
          font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
        }"
      ></editor>
    </div>
    <div>
      <button type="submit">Enregistrer</button>
    </div>
  </form>
  <footerPage />
</template>

<style scoped>
.categoryDiv {
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
}
.checkbox-button input[type="checkbox"] {
  display: none;
}
.checkbox-button.checked {
  background-color: #14f195;
}

.checkbox-button {
  border-radius: 4px;
  padding: 6px 12px;
  margin-bottom: 2%;
  margin-right: 2%;
  cursor: pointer;
  background-color: #f3f3f3;
  border-radius: 50px;
  display: flex;
  justify-content: center;
}
</style>
