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
    login() {
      accountService
        .login(this.user)
        .then((res) => {
          console.log(res.data);
          accountService.saveToken(res.data.token);
        })
        .catch((err) => console.log(err));
    },
    toogleModale: function () {
      this.modalOpen = !this.modalOpen;
    },
  },
};
</script>

<template>
  <h1>Connection</h1>

  <form @submit.prevent="login">
    <div class="form-group">
      <label>E-mail</label>
      <input
        type="text"
        class="form-control"
        placeholder="email"
        v-model="user.email"
      />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input
        type="password"
        class="form-control"
        placeholder="password"
        v-model="user.password"
      />
    </div>
    <input type="submit" class="form-control" placeholder="connexion" />
  </form>
  <div>
    <p @click="toogleModale">pas de compte ? Incrivez vous</p>

    <modale v-bind:modaleOpen="modalOpen" v-bind:toogleModale="toogleModale" />
  </div>
</template>
