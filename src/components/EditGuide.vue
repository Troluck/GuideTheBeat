<script>
import {guideService } from "../_services/guide.service";
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "EditGuide",
  props: [],
  components:{
    'editor':Editor
  },
  data() {
    return {
      guide: {
        title: "",
        imageURL: "",
        subtitle: "",
        content: "",
      },
    };
  },
  methods: {
    addGuide() {
      guideService
        .addGuide(this.guide)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.guide.imageURL = '@public/images/' + file.name;
    
    },
  },

};
</script>
<template>

<form @submit.prevent="addGuide">
    <div>
      <label for="title">Titre:</label>
      <input type="text" id="title" v-model="guide.title" />
    </div>
    <div>
      <label for="image">Image:</label>
      <input type="file" id="image" @change="handleImageUpload" accept="image/*" />
      <img :src="guide.imageURL" alt="Guide Image" v-if="guide.imageURL" />
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
          plugins: [
          
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }"
      ></editor>
    </div>
    <div>
      <button type="submit">Enregistrer</button>
    </div>
  </form>
</template>

<style scoped>



</style>
