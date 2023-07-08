<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
import ModalProfil from "../components/ModalProfil.vue";
import { guideService } from "../_services/guide.service";
import { categoryService } from "../_services/category.service";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "CreateGuide",
  components: {
    modale: ModalProfil,
    editor: Editor,
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
  mounted() {
    this.GetUser();
    this.AllCategory();
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
  <modale
    :userData="userData"
    :modaleOpen="modalOpen"
    :toogleModale="toogleModale"
  />
  <h1>Créer Guide</h1>
  <form @submit.prevent="addGuide" enctype="multipart/form-data">
    <div>
      <label for="title">Titre:</label>
      <input type="text" id="title" v-model="guide.title" />
    </div>
    <div class="categoryDiv">
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
    <div>
      <label for="img">Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        @change="handleImageUpload"
        required
      />
    </div>
    <div>
      <label for="subtitle">Sous-titre:</label>
      <input type="text" id="subtitle" v-model="guide.subtitle" />
    </div>
    <div>
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
      <button type="submit">Enregistrer</button>
    </div>
  </form>
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
@media (max-width: 767px) {
  .headerHome {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 7%;
    margin-right: 7%;
    margin-top: 5%;
  }
  h1 {
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
