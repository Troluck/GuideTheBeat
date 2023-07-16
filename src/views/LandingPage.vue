<script>
import { accountService } from "../_services/account.service";
import ModalRegister from "../components/ModalRegister.vue";
import footer from "../components/footer.vue";

export default {
  name: "LandingPage",
  components: {
    modale: ModalRegister,
    footerPage: footer,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      modalOpen: false,
      errorMessage: "",
      passwordVisible: false,
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
        .catch((err) => {
          console.log(err);
          this.errorMessage =
            "Erreur lors de la connexion. Veuillez vérifier vos informations.";
        });
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<template>
  <header>
    <img src="../../public/img/logo.svg.svg" class="logo" />

    <h1>Guide the Beat</h1>
  </header>
  <div class="body-content">
    <div class="image-left">
      <img src="../../img/radio1.png" class="img1" />
    </div>
    <div class="content">
      <div class="card1">
        <h2>Connexion</h2>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
              :type="passwordVisible ? 'text' : 'password'"
              class="form-control"
              placeholder="password"
              v-model="user.password"
            />
            <span class="toggle-password" @click="togglePasswordVisibility">
              <i v-if="passwordVisible" class="fas fa-eye-slash"></i>
              <i v-else class="fas fa-eye"></i>
            </span>
          </div>
          <input
            type="submit"
            class="form-submit"
            placeholder="connexion"
            value="se connecter"
          />
        </form>
        <div>
          <p class="buttonLog" @click="toogleModale">pas de compte ? Incrivez vous</p>

          <modale v-bind:modaleOpen="modalOpen" v-bind:toogleModale="toogleModale" />
        </div>
      </div>
      <div class="card2">
        <h2 class="h2Bis">Le site de guides communautaires autour de la musique</h2>

        <img src="../../img/clavier2.png" class="img2" />
        <p class="card2-p">
          Vous voulez apprendre ou faire apprendre un instrument, de la MAO, ou tout
          simplement la culture musical, ce site est fait pour vous
        </p>
      </div>
    </div>
    <div class="image-right">
      <img src="../../public/img/CompoDJ.png" class="img2" />
    </div>
  </div>
  <footerPage />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap");

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
  margin-top: 5%;
}
.body-content {
  display: flex;
  justify-content: center;
}
.image-left,
.image-right {
  width: 35%;
  text-align: center;
}
.image-right {
  align-self: flex-end;
}
@media (max-width: 1200px) {
  .body-content .content {
    width: 80vw;
  }
  .image-left,
  .image-right {
    display: none;
  }
}
.img1 {
  width: 70%;
}
.img2 {
  width: 70%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}
.card1,
.card2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
}

.card1 {
  background-color: var(--color-primary);
  width: 100%;
  margin-bottom: 10%;
}

.card2 {
  background-color: var(--color-secondary);
  width: 100%;
}

/* Boutons */
button {
  font-size: 90%;
  padding-left: 5%;
  margin-bottom: 10%;
}

.button1 {
  background-color: var(--color-secondary);
}

.button2 {
  background-color: var(--color-primary);
}

h1,
h2 {
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

.logo {
  width: 20vh;
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
  border-radius: 30px;
  border: none;
  outline: none;
  margin-bottom: 3%;
  color: var(--color-text-light);
  font-size: 120%;
  padding-left: 5%;
}
.form-group {
  position: relative;
}
.toggle-password {
  position: absolute;
  top: 25%;
  right: 12%;
  color: white;
  cursor: pointer;
}

::placeholder {
  color: var(--color-text-light-grey);
}

.form-submit {
  background-color: var(--color-secondary);
  border: none;
  text-align: center;
  padding: 10px;
  width: 50%;
  font-size: 120%;
  border-radius: 30px;
  margin-bottom: 7%;
  outline: none;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
}

.buttonLog {
  color: var(--color-text-dark);
  margin-top: 10%;
  margin-bottom: 20%;
  font-size: 2vh;
  cursor: pointer;
}

.h2Bis {
  color: var(--color-text-light);
  font-size: 30px;
  width: 90%;
  text-align: center;
}

.line {
  background-color: var(--color-text-light);
  width: 90%;
  height: 8px;
  border-radius: 50px;
}
.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
  font-size: 15px;
}
</style>
