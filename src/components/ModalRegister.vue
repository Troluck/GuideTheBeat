<script>
import { accountService } from "../_services/account.service";
export default {
  name: "ModalRegister",
  props: ["modaleOpen", "toogleModale"],
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      accountService
        .register(this.user)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<template>
  <div class="modal" v-if="modaleOpen">
    <div class="overlay">
      <div @click="toogleModale">X</div>
      <h2>Inscription</h2>
      <form @submit.prevent="register" class="formRegister">
        <div class="form-group">
          
          <input type="text" class="form-control" v-model="user.username" placeholder="Nom" />
        </div>

        <div class="form-group">
         
          <input type="text" class="form-control" v-model="user.email"  placeholder="E-mail" />
        </div>

        <div class="form-group">
         
          <input type="password" class="form-control" v-model="user.password" placeholder="mot de passe" />
        </div>
         <div class="form-group">
          <label>Voulez être rédacteur ?</label>
          <input type="checkbox" class="form-control" v-model="role" />
        </div> 
        <input type="submit" class="form-control" value="S'inscrire" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #80ECFF;
  position: fixed;
  border-radius: 5%;
  width: 80%;
}
.formRegister{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.form-group{
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
