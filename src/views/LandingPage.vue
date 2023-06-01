<script>
import { accountService } from "../_services/account.service";

export default {
  name: "LandingPage",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
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
</template>
