<template>
  <div>
    <base-message-modal
      isSmall
      v-bind:message="message"
      v-on:close="clearMessage"
    />
    <router-link
      v-bind:to="link"
      custom
      v-slot="{ navigate, isActive, isExactActive }"
      tag="li"
    >
      <li
        v-on:click="click()"
        v-bind:class="[
          navChild ? isActive && 'router-link-active' : isActive = false && 'router-link-active',
          navChild ? isExactActive && 'router-link-exact-active' : isExactActive = false && 'router-link-exact-active',
        ]"
        v-on:keypress.enter="navigate"
        role="link"
      >
        <img :src="require('@/assets/' + source + '.png')" v-if="source" />
        <span>{{ title }}</span>
      </li>
    </router-link>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseMessageModalVue from "../../UI/BaseMessageModal.vue";
export default {
  props: {
    title: String,
    link: String,
    source: String,
    navChild: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "base-message-modal": BaseMessageModalVue,
  },
  data() {
    return {
      message: null,
    };
  },
  methods: {
    ...mapGetters({
      isDataChanged: "isDataChanged",
    }),
    click() {
      if (this.link == "/dashboard") {
        if (this.isDataChanged() === false) {
          this.$router.push({ path: this.link });
        } else {
          this.message = {
            message:
              "Pengkinian Data Yang Telah Dilakukan Belum Dilakukan Pengiriman Notifikasi",
          };
        }
      } else {
        this.$router.push({ path: this.link });
      }
    },
    clearMessage() {
      this.message = null;
    },
  },
};
</script>

<style scoped>
img {
  margin-right: 10px;
  height: 1rem;
  width: 1.1rem;
}

li {
  padding: 10px;
  background-color: transparent;
  text-decoration: none;
  color: black;
  /* font-size: 14px; */
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 5px;
}

li:hover {
  background-color: #ededed;
}

span {
  font-size: 0.75rem;
  font-weight: bold;
}

li.router-link-exact-active {
  background-color: #ededed;
}

li.router-link-exact-active i {
  color: black;
}

@media (min-width: 1920px) {
  img {
    margin-right: 10px;
    height: 1.2rem;
    width: 1.45rem;
  }

  span {
    font-size: 1rem;
  }
}
</style>
