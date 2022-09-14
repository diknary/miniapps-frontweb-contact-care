<template>
  <div class="login__content-form">
    <base-error-modal isSmall v-bind:error="error" v-on:close="clearError" />
    <h4>Salam Sahabat,</h4>
    <h2><b>Adira Customer Information</b></h2>
    <form v-on:submit.prevent="onSubmit()" class="mt-5 login-form">
      <div class="form-group row mb-4">
        <div class="col-sm-12">
          <div class="input-data">
            <input
              id="nik"
              type="text"
              ref="nik"
              v-on:change="onChangeNik($event)"
              v-on:blur="onBlurNik"
              v-bind:class="{ danger: isTouchedNik && !checkNik }"
              required
            />
            <div class="underline"></div>
            <label for="nik">NIK</label>
          </div>
        </div>
      </div>
      <div class="form-group row mb-4">
        <div class="col-sm-12">
          <div class="input-data">
            <input
              id="password"
              v-bind:type="!showPassword ? 'password' : 'text'"
              ref="password"
              v-on:change="onChangePassword($event)"
              v-on:blur="onBlurPassword"
              v-bind:class="{ danger: isTouchedPassword && !checkPassword }"
              required
            />
            <div class="underline"></div>
            <label for="password">Password</label>
            <span class="view-icon" v-on:click="onShowPassword">
              <img
                src="@/assets/images/icons/view.png"
                alt="Sahabat"
                class="logo-sahabat"
                v-bind:class="{ active: showPassword }"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="form-group row mb-3 incorrect" v-show="incorrect">
        <div class="col-sm-12">
          <span>Incorrect nik or password! Try again!</span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <div class="col-sm-12">
          <button v-bind:class="{ loading: isLoading }">
            <span class="button__text">Masuk</span>
          </button>
        </div>
      </div>
      <div class="copyright">
        <p>Copyright &copy; Adira Finance</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import BaseErrorModal from "../../../components/UI/BaseErrorModal.vue";
import axios from "axios";

export default {
  components: {
    "base-error-modal": BaseErrorModal,
  },
  data() {
    return {
      incorrect: false,
      isLoading: false,
      error: null,
      showPassword: false,
    };
  },
  methods: {
    ...mapMutations([
      "changeUser",
      "login",
      "changeShowHeaders",
      "changeBackground",
      "onChangeNik",
      "onChangePassword",
      "onBlurNik",
      "onBlurPassword",
      "changeListMenu",
      "changeListOpsiDashboard",
      "changeUserName",
      "loginNik",
    ]),
    onShowPassword() {
      this.showPassword = !this.showPassword;
    },
    onSubmit() {
      if (this.$refs.nik.value.trim() === "") {
        this.error = { message: "Input nik tidak boleh kosong!" };
        return;
      }

      if (this.$refs.password.value.trim() === "") {
        this.error = { message: "Input password tidak boleh kosong!" };
        return;
      }

      let params = new URLSearchParams();
      params.append("login", this.$refs.nik.value.trim());
      params.append("password", this.$refs.password.value.trim());
      this.incorrect = false;
      this.isLoading = true;

      axios
        .post(
          process.env.VUE_APP_AD1SERVICE_URI +
            process.env.VUE_APP_AD1SERVICE_PORT +
            "/Portsightdev/api/AuthenticateUser",
          params
        )
        .then((res) => {
          if (res.data === "OK") {
            this.initializeApp();
          } else {
            throw new Error(
              "Could not logged in, please check your credentials"
            );
          }
        })
        .catch((error) => {
          this.error = { message: error.message };
          this.incorrect = true;
          this.isLoading = false;
        });
    },
    clearError() {
      this.error = null;
    },
    initializeApp() {
      let params = new URLSearchParams();
      params.append("NIP", this.$refs.nik.value.trim());

      let getUserNamePromise = axios.post(
        process.env.VUE_APP_AD1SERVICE_URI +
          process.env.VUE_APP_AD1SERVICE_PORT +
          "/Portsightdev/api/GetListEmployeeInfo",
        params
      );

      let getListMenuPromise = axios({
        method: "post",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/list-domain",
        data: {
          refOne: process.env.VUE_APP_LISTMENU_DOMID,
          refTwo: process.env.VUE_APP_LISTMENU_DOMVAL,
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      });

      let getListOpsiPromise = axios({
        method: "post",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/list-domain",
        data: {
          refOne: process.env.VUE_APP_LISTOPSI_DASH_DOMID,
          refTwo: process.env.VUE_APP_LISTOPSI_DASH_DOMVAL,
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      });

      Promise.all([getUserNamePromise, getListMenuPromise, getListOpsiPromise])
        .then((res) => {
          let listResponse;
          //  result getUserNamePromise
          listResponse = res[0].data;
          this.changeUser(listResponse[0].Fullname);
          this.loginNik({
            nik: listResponse[0].Nip,
            brid: listResponse[0].BranchID,
          });

          // result getListMenuPromise
          let listMenu = [];
          listResponse = res[1].data.data;
          for (const data of listResponse) {
            const menu = {
              href: data.value1,
              title: data.value2,
              source: data.value3,
            };
            listMenu.push(menu);
          }
          this.changeListMenu(listMenu);

          // result getListOpsiPromise
          let listOpsi = [];
          listResponse = res[2].data.data;
          for (const data of listResponse) {
            const opsi = {
              label: data.value1,
              value: data.value2,
            };
            listOpsi.push(opsi);
          }
          this.changeListOpsiDashboard(listOpsi);

          this.login();
          this.changeBackground(true);
          this.changeShowHeaders(true);
          this.isLoading = false;
          this.$router.push("/dashboard");
        })
        .catch(function(error) {
          this.error = { message: error.message };
          this.isLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters([
      "authentication",
      "getNik",
      "getPassword",
      "checkNik",
      "checkPassword",
      "isTouchedNik",
      "isTouchedPassword",
    ]),
  },
};
</script>

<style scoped>
.input-data {
  height: 40px;
  width: 100%;
  position: relative;
}

.input-data .view-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0, -50%);
}

.input-data .view-icon img {
  height: 20px;
  width: auto;
  cursor: pointer;
  vertical-align: middle;
  opacity: 0.5;
}

.input-data .view-icon img.active {
  opacity: 1;
}

.input-data input {
  height: 100%;
  width: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid silver;
  padding-left: 10px;
}

.input-data input:focus ~ label,
.input-data input:valid ~ label {
  transform: translateY(-25px);
  font-size: 15px;
  color: #dd5718;
}

.input-data .underline {
  position: absolute;
  bottom: 0px;
  height: 2px;
  width: 100%;
}

.input-data .underline:before {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: #e5017c;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.input-data input:focus ~ .underline::before,
.input-data input:valid ~ .underline::before {
  transform: scaleX(1);
}

.input-data label {
  position: absolute;
  bottom: 2px;
  left: 0;
  color: grey;
  pointer-events: none;
  transition: all 0.3s ease;
}

.login__content-form {
  max-width: 550px;
  height: 70vh;
  padding: 50px 20px 5px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
  border-radius: 20px;
  position: relative;
}

.login__content-form .copyright {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
}

.login__content {
  margin: 0;
  padding: 0;
}

select {
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
}

.change-pass {
  text-align: end;
}

label {
  font-weight: bold;
}

h3 {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: black;
  opacity: 0.8;
}

button {
  padding: 8px;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: #e5017c;
  transition: transform 0.8s ease;
}

button:hover {
  background-color: #dd5718;
  color: black;
  transition: transform 0.8s ease;
}

button:active {
  background-color: #dd5718;
}

.danger {
  border-color: red;
}

.incorrect {
  text-align: end;
}

.incorrect span {
  color: red;
}

@media (min-width: 1920px) {
  .login__content-form {
    width: 800px;
    padding: 60px 40px 5px;
  }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .change-pass {
    text-align: right;
  }
  .login__content-form {
    width: 700px;
    padding: 50px 30px 5px;
  }
}

.button__text {
  transition: all 0.2s;
  color: #ffffff;
  font-weight: bold;
}

.loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.loading::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid #fff;
  border-top-color: #ffdd00;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
