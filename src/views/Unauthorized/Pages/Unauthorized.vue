<template>
  <div class="unauthorized">
    <div class="row unauthorized__content">
      <div
        class="
          col-6
          d-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <h2>Salam sahabat,</h2>
        <h2>Adira Customer Information</h2>
        <h6>Anda tidak berhak mengakses menu ini</h6>
        <h6>Silahkan login kembali melalui menu ad1sys</h6>
      </div>
      <div
        class="
          col-6
          unauthorized__content-right
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <img src="@/assets/images/adira-logo.png" alt="Sahabat" class="logo" />
        <img
          src="@/assets/images/logo-sahabat.png"
          alt="Sahabat"
          class="logo-sahabat"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.unauthorized {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.unauthorized__content {
  width: 100vw;
  height: 100vh;
}

.unauthorized__content-right {
  background-image: linear-gradient(#ffc8dd, #ffc5bf, #ff83ae);
}

.logo {
  position: fixed;
  top: 30px;
  right: 30px;
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
    right: 30px;
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
