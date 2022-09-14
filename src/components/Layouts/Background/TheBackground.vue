<template>
  <section>
    <div class="background home" v-if="home"></div>
    <div class="background login" v-else-if="login"></div>
  </section>
</template>

<script>
export default {
  props: {
    home: {
      type: Boolean,
      default: false,
    },
    login: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}

.home {
  background-image: url("~@/assets/images/Background-Page.png");
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login {
  display: flex;
  background: #ffffff;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
