<template>
  <div class="login">
    <div class="row login__content">
      <div class="col-6 d-flex justify-content-center align-items-center">
        <img src="@/assets/images/adira-logo.png" alt="Sahabat" class="logo" />
        <img
          src="@/assets/images/logo-sahabat.png"
          alt="Sahabat"
          class="logo-sahabat"
        />
      </div>
      <div
        class="col-6 login__content-right d-flex justify-content-center align-items-center"
      >
        <login-form />
      </div>
    </div>
    <div class="magic-words">
      <h4>Gunakan selalu magic words dalam berkomunikasi :</h4>
      <h4><b>Bolehkah / Mohon / Tolong / Maaf / Terima Kasih</b></h4>
    </div>
  </div>
</template>

<script>
import LoginForm from "../Components/LoginForm";

export default {
  components: {
    "login-form": LoginForm,
  },
};
</script>

<style scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.login__content {
  width: 100vw;
  height: 100vh;
}

.login__content-right {
  background-image: linear-gradient(#e5017c, #df4231, #dd5718);
}

.logo {
  position: fixed;
  top: 30px;
  left: 30px;
  height: 50px;
  width: auto;
}

.logo-sahabat {
  width: auto;
  height: 350px;
}

.magic-words {
  position: fixed;
  padding: 0;
  margin: 0;
  left: 30px;
  bottom: 30px;
}

@media (min-width: 1920px) {
  .logo {
    position: fixed;
    top: 30px;
    left: 30px;
    height: 70px;
    width: auto;
  }

  .logo-sahabat {
    width: auto;
    height: 450px;
  }

  .magic-words {
    position: fixed;
    padding: 0;
    margin: 0;
    left: 30px;
    bottom: 30px;
  }
}
</style>
