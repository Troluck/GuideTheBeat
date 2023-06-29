<script>
import { guideService } from "../_services/guide.service";
import { categoryService } from "../_services/category.service";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "EditGuide",
  props: [],
  components: {
    editor: Editor,
  },
  data() {
    return {
      guide: {
        title: "",
        img: null,
        subtitle: "",
        content: "",
        category: [],
      },
      categories: [],
    };
  },
  methods: {
    addGuide() {
      const formData = new FormData();
      formData.append("title", this.guide.title);
      formData.append("subtitle", this.guide.subtitle);
      formData.append("content", this.guide.content);
      formData.append("category", this.guide.category);
      formData.append("img", this.$refs.img.files[0]);
      this.guide.img = this.$refs.img.files[0];
      console.log(this.$refs.img.files[0]);
      guideService
        .addGuide(this.guide)
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
        :class="{ checked: guide.category.includes(category._id) }"
        v-for="category in categories"
        :key="category._id"
      >
        <input type="checkbox" v-model="guide.category" :value="category._id" />
        <span>{{ category.label }}</span>
      </label>
    </div>
    <div>
      <label for="img">Image:</label>
      <input type="file" id="image" name="img" ref="img" accept="image/*" />
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
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
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
