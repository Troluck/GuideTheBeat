<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
import { guideService } from "../_services/guide.service";
import { useToast } from "vue-toastification";
import { categoryService } from "../_services/category.service";
import Editor from "@tinymce/tinymce-vue";
import header from "../components/header.vue";
import footer from "../components/footer.vue";

export default {
  name: "CreateGuide",
  components: {
    editor: Editor,
    HeaderPage: header,
    footerPage: footer,
  },
  data() {
    return {
      token: null,
      userData: [],
      guide: {
        title: "",
        image: null,
        subtitle: "",
        content: "",
        user: "",
        category: [],
      },
      categories: [],
      modalOpen: false,
      isEditor: false,
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
          }));
          this.userData = this.userData[0];
          this.isEditor = this.userData.role === "editor";
          console.log(this.userData);
        })
        .catch((err) => console.log(err));
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      this.guide.image = file;
    },

    addGuide() {
      this.guide.user = this.userData._id;
      this.guide.category = this.categories
        .filter((category) => category.isChecked)
        .map((category) => category._id);
      const formData = new FormData();
      formData.append("title", this.guide.title);
      formData.append("subtitle", this.guide.subtitle);
      formData.append("content", this.guide.content);
      for (const categoryId of this.guide.category) {
        formData.append("category[]", categoryId);
      }
      formData.append("image", this.guide.image);
      formData.append("user", this.guide.user);
      // formData.append("user", this.guide.user);
      guideService
        .addGuide(formData)
        .then((res) => {
          console.log(res.data);
          this.toast.success("Votre guide à été crée avec succès !");
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
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
  },
};
</script>

<template>
  <HeaderPage />
  <div class="createGuide-container">
    <h1>Créer Guide</h1>
    <form class="form-container" @submit.prevent="addGuide" enctype="multipart/form-data">
      <label for="title">Titre :</label>
      <input
        type="text"
        class="form-control title-form"
        id="title"
        v-model="guide.title"
      />

      <div class="categoryDiv">
        <label>Choix Catégories</label>
        <div>
          <label
            class="checkbox-button"
            :class="{ checked: category.isChecked }"
            v-for="category in categories"
            :key="category._id"
          >
            <input type="checkbox" v-model="category.isChecked" />
            <span>{{ category.label }}</span>
          </label>
        </div>
      </div>
      <div>
        <label for="image" class="custom-file-label">
          {{ guide.image ? guide.image.name : "Choisissez une image" }}</label
        >
        <input type="file" id="image" name="image" @change="handleImageUpload" required />
      </div>

      <label for="subtitle">Sous-titre :</label>
      <textarea
        id="subtitle"
        class="form-control subtitle-form"
        v-model="guide.subtitle"
      ></textarea>

      <div class="contenu-container">
        <label for="content">Contenu:</label>
        <editor
          id="content"
          v-model="guide.content"
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
        <button type="submit" class="form-submit">Enregistrer</button>
      </div>
    </form>
  </div>
  <footerPage />
</template>

<style scoped>
h1 {
  color: var(--color-text-dark);
}
label {
  font-size: 20px;
  color: var(--color-text-dark);
  margin-bottom: 2%;
}
.createGuide-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-tertiary);
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 20px;
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.contenu-container {
  width: 90%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title-form {
  height: 50px;
  padding-left: 2%;
}
.subtitle-form {
  height: 70px;
  padding: 2%;
}
.form-control {
  background-color: var(--color-text-light);
  width: 50%;
  border-radius: 30px;
  border: none;
  outline: none;
  margin-bottom: 3%;
  color: var(--color-text-dark);
  font-size: 120%;
  font-family: "Didact Gothic", sans-serif;
}
.categoryDiv {
  margin-top: 5%;
  padding: 5px;
  width: 80%;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  white-space: nowrap;
  background-color: var(--color-tertiary);
  border-radius: 20px;
}
input[type="file"] {
  display: none;
}

/* Style du bouton personnalisé */
.custom-file-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--color-secondary);
  color: var(--color-text-light);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20%;
  margin-bottom: 20%;
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
.form-submit {
  background-color: var(--color-secondary);
  border: none;
  text-align: center;
  padding: 10px;
  margin-top: 20%;
  font-size: 120%;
  border-radius: 30px;
  margin-bottom: 7%;
  outline: none;
  cursor: pointer;
  color: var(--color-text-light);
  font-family: "Josefin Sans", sans-serif;
}
@media (max-width: 900px) {
  .createGuide-container {
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
  }
}
@media (max-width: 600px) {
  .createGuide-container {
    margin-left: 2%;
    margin-right: 2%;
  }
  .form-control {
    width: 90%;
  }
}
</style>
