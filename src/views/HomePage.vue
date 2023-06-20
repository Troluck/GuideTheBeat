<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
export default {
  name: "HomePage",
  data() {
    return {
      token: null,
      userData: [],
    };
  },
  mounted() {
    this.GetUser();
  },
  methods: {
    GetUser() {
      userService
        .getUser()
        .then((res) => {
          this.userData = res.data.user.map((user) => ({
            ...user,
          }));
          this.userData = this.userData[0];
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<template>
  <header>
    <img src="../../public/img/logo.svg.svg" class="logo" />
    <div class="profil">
      <p class="usernameText">
        {{ userData.username ? userData.username.charAt(0) : "" }}
      </p>
    </div>
  </header>
</template>
<style>
header {
  display: flex;
}
.logo {
  width: 5vh;
}
.profil {
  background-color: red;
  width: 5vh;
  height: 5vh;
  display: flex;
  justify-content: center;
  border-radius: 50%;
}

.usernameText {
  font-size: 100%;
}
</style>
