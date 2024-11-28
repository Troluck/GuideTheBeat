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
    editor: Editor,
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
      showDeleteConfirmation: false,
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
    DeleteGuide() {
      guideService
        .deleteGuide(this.guideData._id)
        .then((res) => {
          console.log(res.data);
          this.toast.warning("Votre guide à été supprimé !");
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
    },
    toggleDeleteConfirmation() {
      this.showDeleteConfirmation = !this.showDeleteConfirmation;
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
  <div class="createGuide-container">
    <h1>Modifier votre Guide</h1>
    <form
      class="form-container"
      @submit.prevent="UpdateGuide"
      enctype="multipart/form-data"
    >
      <label for="title">Titre:</label>
      <input
        type="text"
        class="form-control title-form"
        id="title"
        v-model="guideData.title"
      />

      <div class="categoryDiv">
        <label>Choix Catégories</label>
        <div>
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
      </div>
      <div>
        <input type="file" id="image" name="image" @change="handleImageUpload" />
      </div>

      <label for="subtitle">Sous-titre:</label>
      <textarea
        id="subtitle"
        class="form-control subtitle-form"
        v-model="guideData.subtitle"
      ></textarea>

      <div class="contenu-container">
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
        <button type="submit" class="form-submit">Enregistrer</button>
      </div>
    </form>

    <button class="form-submit red" @click="toggleDeleteConfirmation()">
      Supprimer le guide
    </button>
    <div v-if="showDeleteConfirmation" class="delete-confirmation-modal">
      <div class="deleteModal-Container">
        <h2>Êtes-vous sûr de vouloir supprimer ce guide ?</h2>
        <div class="modal-actions">
          <button @click="toggleDeleteConfirmation">Annuler</button>
          <button @click="DeleteGuide">Confirmer</button>
        </div>
      </div>
    </div>
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
.red {
  margin-top: 5%;
  background-color: red;
}
.delete-confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.deleteModal-Container {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 30px;
  padding: 2%;
}

.delete-confirmation-modal h2 {
  color: #fff;
  font-size: 24px;
  text-align: center;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.modal-actions button {
  padding: 10px 20px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-actions button:hover {
  background-color: #f3f3f3;
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
