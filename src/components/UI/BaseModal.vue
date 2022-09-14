<template>
  <transition name="modal">
    <div class="modal-wrapper" v-if="primary || secondary">
      <transition name="backdrop">
        <div v-if="primary || secondary" class="backdrop"></div>
      </transition>
      <!-- <transition name="modal"> -->
      <dialog
        v-bind:open="primary"
        v-if="primary"
        v-bind:class="{
          primary: primary,
          small: isSmall,
          medium: isMedium,
          large: isLarge,
          'bg-color': bgColor,
        }"
      >
        <div class="modal__header">
          <div class="row pl-3 pr-3" v-if="title">
            <div class="col-sm-6 pl-0 pr-0">
              <h3>{{ title }}</h3>
            </div>
            <div
              class="col-sm-6 pl-0 pr-0 d-flex flex-column justify-content-end"
            >
              <h5 v-if="label || header">
                {{ label }} : <b>{{ header }}</b>
              </h5>
            </div>
          </div>
          <slot name="header"> </slot>
        </div>
        <div class="modal__content">
          <slot name="content"> </slot>
        </div>
      </dialog>
      <!-- </transition> -->
      <!-- <transition name="modal"> -->
      <dialog
        v-bind:open="secondary"
        v-if="secondary"
        v-bind:class="{
          secondary: secondary,
          small: isSmall,
          medium: isMedium,
          large: isLarge,
        }"
      >
        <div class="modal__header mb-2">
          <div class="row mb-3">
            <div class="col-sm-12">
              <h3>{{ header }}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <h5>Edit Data {{ legend }}</h5>
            </div>
          </div>
        </div>
        <div class="modal__content">
          <slot name="content"> </slot>
        </div>
        <div class="modal__footer" v-bind:class="{ right: isFooterRight }">
          <slot name="footer"> </slot>
        </div>
      </dialog>
      <!-- </transition> -->
    </div>
  </transition>
</template>

<script>
export default {
  name: "base-modal",
  props: {
    open: Boolean,
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isMedium: {
      type: Boolean,
      default: false,
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
    isFooterRight: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    header: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    legend: {
      type: String,
      default: "",
    },
    bgColor: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

.modal__header {
  padding: 25px 30px 5px;
  background-color: #ffc5bf;
  border-radius: 12px 12px 0px 0px;
}

.modal__content {
  padding: 0px 30px 0px;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
}

dialog {
  position: fixed;
  left: 0;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  background-color: white;
  z-index: 100;
  border: none;
  top: 25vh;
}

dialog.primary {
  padding: 0px 0px 20px;
}

dialog.secondary {
  padding: 0px 0px 20px;
}

dialog.confirmation {
  top: 35vh;
}

.bg-color {
  background-color: #ffc5bf;
}

.dokumen {
  display: none;
}

.modal-enter-active {
  animation: modal 0.5s ease-out;
}

.modal-leave-active {
  animation: modal-close 0.5s ease-out;
}

.backdrop-enter-active {
  animation: modal 0.5s ease-out;
}

.backdrop-leave-active {
  animation: modal-close 0.5s ease-out;
}

.small {
  width: 25%;
}

.medium {
  top: 10vh;
  width: 60%;
}

.large {
  top: 5vh;
  width: 80%;
  height: calc(100vh - 2 * 7vh);
}

.large .modal__content {
  height: calc(100vh - 2 * 10vh);
}

.right {
  display: flex;
  justify-content: flex-end;
}

label {
  text-align: end;
}

@keyframes modal {
  from {
    opacity: 0;
    /* transform: translateY(-50px) scale(0.9); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0) scale(1); */
  }
}

@keyframes modal-close {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (min-width: 1920px) {
  dialog {
    top: 20vh;
    /* padding: 40px; */
  }
  .medium {
    width: 60%;
  }

  .large {
    top: 5vh;
    width: 80%;
    height: calc(100vh - 2 * 10vh);
  }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  dialog {
    left: 25vw;
  }

  dialog.small {
    top: 20vh;
  }

  dialog.medium {
    left: 10vw;
    top: 3vh;
  }

  dialog.large {
    left: 10vw;
  }
}
</style>
