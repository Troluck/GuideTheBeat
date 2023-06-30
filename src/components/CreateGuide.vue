<script>
import { guideService } from "../_services/guide.service";
import { categoryService } from "../_services/category.service";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "CreateGuide",
  props: ["userData"],
  components: {
    editor: Editor,
  },
  data() {
    return {
      user: {
        _id: this.userData._id,
      },
      guide: {
        title: "",
        image: null,
        subtitle: "",
        content: "",
        user: "",
        category: [],
      },
      categories: [],
      isChecked: false,
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.guide.image = file;
    },

    addGuide() {
      this.guide.user = this.user._id;
      this.guide.category = this.categories
        .filter((category) => category.isChecked)
        .map((category) => category._id);
      const formData = new FormData();
      formData.append("title", this.guide.title);
      formData.append("subtitle", this.guide.subtitle);
      formData.append("content", this.guide.content);
      formData.append("category", this.guide.category);
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
  mounted() {
    this.AllCategory();
  },
  watch: {
    userData: {
      immediate: true,
      handler(newUserData) {
        if (newUserData) {
          this.user._id = newUserData._id;
        }
      },
    },
  },
};
</script>
<template>
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
</style>
