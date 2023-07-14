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
      <button class="button1">MAGASIN</button>
      <button class="button2">MENTIONS LEGALES</button>
      <p class="pBottom">GUIDE THE BEAT 2023</p>
    </div>
  </footer>
</template>

<style>
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
}
.pBottom {
  color: var(--color-text-light);
  font-size: 100%;
}
</style>
