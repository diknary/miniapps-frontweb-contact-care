<template>
  <div class="header">
    <div class="header__left d-flex justify-content-evenly align-items-center">
      <div class="header__left-title">
        <h2>Adira Customer Information</h2>
      </div>
    </div>
    <div class="header__right">
      <div
        class="header__right-user d-flex justify-content-end align-items-center"
        v-if="getIsNasabah && custInfo !== null"
      >
        <div class="px-2">
          <Cart @onViewCart="viewCart" />
        </div>

        <ModalCart
          v-model="showCart"
          :listData="{ data: getCartItem }"
        />

        <div
          class="details mr-4 d-flex justify-content-end align-items-center"
          v-bind:class="{ active: btnCaret }"
        >
          <span class="mr-2"
            >Salam Sahabat, <b>{{ custInfo.customer_FULLNAME }}</b>
            <h6 class="text-right">{{ date }}</h6></span
          >
          <div
            v-bind:class="{ caret: true, active: btnCaret }"
            v-on:click="toggleBtnCaretHandler"
          ></div>
          <div v-bind:class="{ dropdown: true, active: btnCaret }">
            <ul>
              <li v-on:click="onLogOutHandler"><span>Log out</span></li>
            </ul>
          </div>
        </div>
        <!-- <base-button type="button" isDanger v-on:click="onLogOutHandler"
          >LOGOUT</base-button
        > -->
      </div>
      <div
        class="header__right-user d-flex justify-content-end align-items-center"
        v-else-if="!getIsNasabah && getCsName !== null && getCsName !== ''"
      >
        <div
          class="details mr-4 d-flex justify-content-end align-items-center"
          v-bind:class="{ active: btnCaret }"
        >
          <span class="mr-2"
            >Salam Sahabat, {{ job }} <b>{{ getCsName }}</b>
            <h6 class="text-right">{{ date }}</h6>
          </span>
          <div
            v-bind:class="{ caret: true, active: btnCaret }"
            v-on:click="toggleBtnCaretHandler"
          ></div>
          <div v-bind:class="{ dropdown: true, active: btnCaret }">
            <ul>
              <li v-on:click="onLogOutHandler"><span>Log out</span></li>
            </ul>
          </div>
        </div>

        <!-- <base-button type="button" isDanger v-on:click="onLogOutHandler"
          >LOGOUT</base-button
        > -->
      </div>
    </div>
  </div>
</template>

<script>
// import BaseButton from "../../UI/BaseButton.vue";
import { mapGetters, mapMutations } from "vuex";
import Cart from "../../UI/Cart.vue";
import ModalCart from "../Header/Modals/ModalCart.vue";

export default {
  components: {
    // "base-button": BaseButton,
    Cart,
    ModalCart,
  },
  data() {
    return {
      date: "",
      btnCaret: false,
      showCart: { showModal: false }
    };
  },
  methods: {
    ...mapMutations([
      "logout",
      "changeDefaultHeaders",
      "changeDefaultBackground",
      "changeToAdira",
    ]),
    onLogOutHandler() {
      this.logout();
      this.changeDefaultHeaders();
      this.changeDefaultBackground();
      this.changeToAdira();
      this.$router.push("/login");
    },
    toggleBtnCaretHandler() {
      this.btnCaret = !this.btnCaret;
    },
    viewCart() {
      this.showCart.showModal = true;
    }
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
  computed: {
    ...mapGetters(["getIsNasabah", "getCsName", "getNamaCustomer", "getCartItem"]),
    ...mapGetters({
      custInfo: "getCustomerInfo",
      job: "getJob",
      getPdkConfig: "getPdkConfig"
    }),
  },
};
</script>

<style scoped>
.text-right {
  text-align: end;
  padding: 0;
  margin: 0;
}

.header {
  padding: 10px 30px;
  display: flex;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
}

.avatar {
  margin-left: 10px;
}

.header .header__left .header__left-title h2 {
  font-weight: bold;
}

.header__right {
  padding: 0px 15px;
  width: 700px;
}

.header__right .header__right-user span {
  font-size: 1rem;
}

.caret {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #784f54;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.caret.active {
  transform: rotate(180deg);
  transition: 0.3s ease-in-out;
}

.details {
  position: relative;
  background-color: #ffa5af;
  padding: 3px 20px;
  border-radius: 15px;
  border: black 0.1px solid;
  transition: 0.3s ease-in;
}

.details.active {
  border-bottom: none;
  border-radius: 15px 15px 0px 0px;
  transition: 0.3s ease-in;
}

.dropdown {
  display: none;
  position: absolute;
  margin: 0;
  width: 100%;
  top: 50px;
  right: 0px;
  z-index: 100;
  transition: 1s ease-in-out;
}

.dropdown.active {
  display: block;
  transition: 1s ease-in-out;
}

.dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown ul li {
  text-align: center;
  cursor: pointer;
  padding: 5px 0px;
  background-color: #ffbfc6;
  border: black solid 0.5px;
  border-radius: 5px;
}

.dropdown ul li:first-child {
  border-radius: 0px 0px 5px 5px;
}

.dropdown ul li:hover {
  background-color: #ffa5af;
}
</style>
