<script>
import { accountService } from "../_services/account.service";
import ModalRegister from "../components/ModalRegister.vue";


export default {
  name: "LandingPage",
  components: {
    modale: ModalRegister,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      modalOpen: false,
    };
  },
  methods: {
    toogleModale: function () {
      this.modalOpen = !this.modalOpen;
    },
    login() {
      accountService
        .login(this.user)
        .then((res) => {
          console.log(res.data);
          accountService.saveToken(res.data.token);
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<template>
  <header>
    <img src="../../public/img/logo.svg.svg" class="logo" />
    <h1>Guide the Beat</h1>
  </header>

  <div class="content">
    <div class="card1">
      <h2>Connexion</h2>

      <form @submit.prevent="login" class="formConnect">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="email"
            v-model="user.email"
          />
        </div>

        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="user.password"
          />
        </div>
        <input
          type="submit"
          class="form-submit"
          placeholder="connexion"
          value="se connecter"
        />
      </form>
      <div>
        <p class="buttonLog" @click="toogleModale">
          pas de compte ? Incrivez vous
        </p>

        <modale
          v-bind:modaleOpen="modalOpen"
          v-bind:toogleModale="toogleModale"
        />
      </div>
    </div>
    <div class="imgdiv" style="z-index: 0">
      <img src="../../img/radio1.png" class="img1" />
    </div>

    <div class="part2">
      <div class="imgdiv2" style="z-index: 0">
        <img src="../../img/clavier2.png" class="img2" />
      </div>
      <div class="card2">
        <h2 class="h2Bis">
          Le site de guides communautaires autour de la musique
        </h2>
        <div class="line"></div>
        <p class="card2-p">
          Vous voulez apprendre ou faire apprendre un instrument, de la MAO, ou
          tout simplement la culture musical, ce site est fait pour vous
        </p>
      </div>
    </div>
    <footer>
      <img src="../../img/CdPlayer.png" class="img3" />
      <div class="footerLink">
        <button class="button1">MAGASIN</button>
        <button class="button2">MENTIONS LEGALES</button>
        <p class="pBottom">GUIDE THE BEAT 2023</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap");

/* Couleurs */
:root {
  --color-primary: #14f195;
  --color-secondary: #eb54bc;
  --color-tertiary: #80ecff;
  --color-text-light: #f3f3f3;
  --color-text-dark: #1d2121;
  --color-background: #1d2121;
}

/* Général */
body {
  background-color: var(--color-background);
  font-family: "Josefin Sans", sans-serif;
}

/* En-tête et pied de page */
header,
footer {
  display: flex;
  justify-content: center;
}

header {
  flex-direction: column;
  margin-top: 2vh;
  align-items: center;
}

footer {
  margin-top: 20%;
}

.footerLink {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* Boutons */
button {
  font-size: 90%;
  padding-left: 5%;
  margin-bottom: 10%;
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
}

.button1 {
  background-color: var(--color-secondary);
}

.button2 {
  background-color: var(--color-primary);
}

/* Textes */
h1,
h2,
p {
  font-size: 5vh;
  font-family: "Josefin Sans", sans-serif;
}

h1 {
  color: var(--color-text-light);
}

h2 {
  font-size: 30px;
  color: var(--color-text-dark);
}

.pBottom {
  color: var(--color-text-light);
  font-size: 100%;
}

/* Contenu */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Logo */
.logo {
  width: 20vh;
}

/* Cartes */
.card1,
.card2 {
  width: 90vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
}

.card1 {
  background-color: var(--color-primary);
}

.card2 {
  background-color: var(--color-secondary);
  margin-top: 5vmin;
}
.part2 {
  margin-top: -20%;
}

.card2-p {
  color: var(--color-text-light);
  font-size: 20px;
  width: 90%;
  text-align: center;
}

/* Formulaire de connexion */
.formConnect {
  width: 100%;
  text-align: center;
}

.form-control {
  background-color: var(--color-background);
  width: 80%;
  height: 50px;
  border-radius: 50px;
  outline: none;
  margin-bottom: 3%;
  color: var(--color-text-light);
  font-size: 120%;
  padding-left: 5%;
}

::placeholder {
  color: var(--color-text-light);
}

.form-submit {
  background-color: var(--color-secondary);
  border: none;
  text-align: center;
  padding: 10px;
  width: 50%;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
}

/* Autres */
.buttonLog {
  color: var(--color-text-dark);
  margin-bottom: 25vmin;
  margin-top: 10%;
  font-size: 4vmin;
  cursor: pointer;
}

.h2Bis {
  color: var(--color-text-light);
  font-size: 30px;
  width: 90%;
  text-align: center;
}

.line {
  background-color: var(--color-background);
  width: 90%;
  height: 8px;
  border-radius: 50px;
}

/* Images */
.img1 {
  height: 100%;
  width: 100%;
}

.img2 {
  width: 85vmin;
}

.img3 {
  width: 50vmin;
}

.imgdiv {
  position: relative;
  height: 40vmin;
  top: -20vmin;
}

.imgdiv2 {
  position: relative;
  text-align: center;
  height: 40vmin;
  top: 15vmin;
}
</style>
