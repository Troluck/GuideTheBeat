<script>
export default {
  name: "footer",

  data() {},
  mounted() {},
  methods: {},
};
</script>
<template>
  <footer>
    <img src="../../img/CdPlayer.png" class="img3" />

    <div class="footerLink">
      <a href="http://guidethebeatgoodies.local/">
        <button class="button1">MAGASIN</button>
      </a>
      <button class="button2">MENTIONS LEGALES</button>
      <p class="pBottom">GUIDE THE BEAT 2023</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
.img3 {
  width: 50vmin;
}
.footerLink {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.button1,
.button2 {
  color: var(--color-text-light);
  text-align: center;
  padding: 10px;
  width: 100%;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  border: none;
  margin-bottom: 10%;
}

.button1 {
  background-color: var(--color-secondary);
}

.button2 {
  background-color: var(--color-primary);
}
.pBottom {
  color: var(--color-text-light);
  font-size: 100%;
}
</style>
