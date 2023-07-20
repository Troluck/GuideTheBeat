<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap");

/* Couleurs */
:root {
  --color-primary: #14f195;
  --color-secondary: #eb54bc;
  --color-tertiary: #80ecff;
  --color-text-light: #f3f3f3;
  --color-text-light-grey: #f3f3f38f;
  --color-text-dark: #1d2121;
  --color-background: #1d2121;
}
/* General */
body {
  background-color: var(--color-background);
  font-family: "Josefin Sans", sans-serif;
  margin: 0;
}
.Vue-Toastification__toast {
  justify-content: center;
  align-items: center;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
</style>
