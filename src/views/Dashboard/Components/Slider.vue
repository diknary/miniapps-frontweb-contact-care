<template>
  <div class="dashboard__slider">
    <div
      class="dashboard__slider-item"
      v-for="(image, currentIndex) in images"
      :key="currentIndex"
    >
      <div class="image-wrapper">
        <img v-bind:src="image" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Slider",
  data() {
    return {
      images: [
        require(`@/assets/images/banner/FA_Pengaduan-Konsumen.jpg`)
        /*
        "https://momobil.id/news/wp-content/uploads/2019/02/Harcilnas-Adira-Finance-2019-1024x576.jpg",
        require(`@/assets/images/banner/adiraku_Banner.jpg`),
        "https://www.adira.co.id/img/frontend/promo/ASURANSI-JIWA-SYARIAH_PROMO-BANNER-WEBSITE-ADIRAPOIN-1920-x-900.jpg",
        "https://momobil.id/news/wp-content/uploads/2018/09/Promo-BALI-Festival-Pesona-Lokal.jpg",
        "https://momobil.id/news/wp-content/uploads/2019/02/Harcilnas-Adira-Finance-2019-1024x576.jpg", */
      ],
      timer: null,
      currentIndex: 0,
    };
  },
};
</script>

<style scoped>
.dashboard__slider {
  overflow: hidden;
  min-height: 350px;;
}

.dashboard__slider-item {
  position: relative;
  width: 500%;
  margin: 0;
  left: 0;
  /*animation: 20s slider infinite;*/ /*REMOVE REMARK JIKA LEBIH DARI 1 SLIDER*/ 
  text-align: center;
}

.dashboard__slider-item .image-wrapper {
  width: 20%;
  float: left;
  height: 350px;
  padding: 0px 200px;
}

.image-wrapper img {
  margin: 0;
  height: 350px;
  width: 100%;
  border-radius: 20px;
}

@media (min-width: 1600px) {
  .image-wrapper img {
    height: 550px;
    width: 100%;
  }
  .dashboard__slider-item .image-wrapper {
    width: 20%;
    float: left;
    height: 550px;
  }
}

@media (max-width: 1600px) and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  .dashboard__slider-item .image-wrapper {
    width: 20%;
    float: left;
    height: 330px;
    padding: 0px 200px;
  }

  .image-wrapper img {
    margin: 0;
    height: 330px;
    width: 100%;
    border-radius: 20px;
  }
}

@keyframes slider {
  0% {
    left: 0;
  }
  20% {
    left: 0;
  }
  25% {
    left: -100%;
  }
  45% {
    left: -100%;
  }
  50% {
    left: -200%;
  }
  70% {
    left: -200%;
  }
  75% {
    left: -300%;
  }
  95% {
    left: -300%;
  }
  100% {
    left: -400%;
  }
}
</style>
