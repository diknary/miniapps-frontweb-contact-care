<template>
  <div class="dashboard__title">
    <div>
      <img src="@/assets/images/logo-lamp.png" alt="logo" />
      <span><em>Selamat POIN Anda Sejumlah 1.000 Poin. </em></span
      ><a href="#">Klik lebih detail</a>
    </div>
    <h5>{{ date }}</h5>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
    };
  },
  created() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date = new Date();
    this.date = date.toLocaleDateString("ID-id", options);
  },
};
</script>

<style scoped>
.dashboard__title {
  display: flex;
  justify-content: space-between;
  padding: 10px 50px 0px;
  vertical-align: middle;
}

.dashboard__title img {
  height: 50px;
  width: 70px;
}
</style>
