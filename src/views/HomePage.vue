<script>
import { accountService } from "../_services/account.service";
import { userService } from "../_services/user.service";
export default {
  name: "HomePage",
  data() {
    return {
      token: null,
      userData: null,
    };
  },
  mounted() {
    userService.getUser();
  },
  methods: {},
};
</script>

<template>
  <header>
    <img src="../../public/img/logo.svg.svg" class="logo" />
    <div class="profil">
      <div class="profilButton"></div>
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
  width: 20vh;
}
.profilButton {
  background-color: red;
  height: 20px;
  width: 20px;
  border-radius: 10px;
}
</style>
