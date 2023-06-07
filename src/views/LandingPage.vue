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
  <header>
    <img src="../../public/img/logo.svg.svg" class="logo">
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
      <input type="submit" class="form-submit" placeholder="connexion" value="se connecter" />
    </form>
    <div>
      <p @click="toogleModale">pas de compte ? Incrivez vous</p>
  
      <modale v-bind:modaleOpen="modalOpen" v-bind:toogleModale="toogleModale" />
    </div>

  </div>
  <div class="imgdiv">
  <img src="../../img/radio1.png" class="img1">
  </div>
 
  <div class="card2">
    <h2 class="h2Bis">Le site de guides communautaires
autour de la musique
</h2>
<div class="line"></div>
<p class="card2-p">Vous voulez apprendre ou faire apprendre un instrument, 
de la MAO, ou tout simplement la culture musical, ce site est fait pour vous </p>
</div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');


body{
  background-color: #1D2121;
}

header{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;

}
.logo{
  width: 20vh;
}
h1,h2{
  font-family: 'Josefin Sans', sans-serif;
  font-size: 5vh;
  
}
h1{
  color:#F3F3F3;
}
h2{
  font-size: 30px;
  color:#1D2121;
  
}
.card1{
  background-color: #14F195;
  width: 90vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
}
.formConnect{
  width: 100%;
  text-align: center;
}
.form-control{
  background-color: #1D2121;
  width: 80%;
  height: 50px;
  border-radius: 50px;
  outline: none;
  margin-bottom: 3%;

}
 ::placeholder{
  color:#F3F3F3;
} 
input {
  color:#F3F3F3;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 120%;
  padding-left: 5%;
}
.form-submit{
  background-color: #EB54BC;
  border: none;
  text-align: center;
  padding: 10px;
  width: 50%;
  border-radius: 30px;
  outline: none;
  cursor: pointer;

}
p{
  color:#1D2121;
  font-family: 'Josefin Sans', sans-serif;
  margin-bottom: 25vmin;
  margin-top:10%;
  font-size: 4vmin;
  cursor: pointer;
}
.card2{
  margin-top: 5vmin;
  background-color: #EB54BC;
  width: 90vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.25);
}
.h2Bis{
  color:#F3F3F3;
  font-size: 30px;
  width: 90%;
  text-align: center;
}
.line{
  background-color:#1D2121;
  width: 90%;
  height: 8px;
  border-radius: 50px;

}
.card2-p{
  color:#F3F3F3;
  font-size: 20px;
  width: 90%;
  text-align: center;
  
  
}
.img1{
height: 100%;
width: 100%;  
}
.imgdiv{
position: relative;
  height: 40vmin;
  top:-20vmin;
  left: 5vmin; 
}








</style>
