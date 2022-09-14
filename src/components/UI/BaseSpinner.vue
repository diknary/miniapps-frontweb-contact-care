<template>
  <div id="wrapper" v-if="show">
    <!-- Spinner -->
    <div class="loading-spinner" v-if="spinner"></div>

    <!-- Dots loader -->
    <div class="loading-dots" v-else-if="dots">
      <div class="bounce"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <div class="default" v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    spinner: {
      type: Boolean,
      default: false,
    },
    dots: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
#wrapper {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
}

.loading-spinner {
  width: 10rem;
  height: 10rem;
  display: inline-block;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  margin-bottom: 10rem;
  animation: spin infinite ease-in-out;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-dots > div {
  width: 1rem;
  height: 1rem;
  margin: 0 10px;
  background-color: #ffdd00;
  border-radius: 50%;
  display: inline-block;
  animation: 1.5s bounce infinite ease-in-out both;
}

.loading-dots .bounce {
  animation-delay: -0.3s;
}

.loading-dots .bounce2 {
  animation-delay: -0.15s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
