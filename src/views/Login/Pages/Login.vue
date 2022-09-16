<template>
  <div class="login-container d-flex justify-content-center">
      <div class="login-card">
          <div class="login-header">
            <div class="image-container">
                <img :src="require('@/assets/images/adira-logo.png')" class="login-logo"/>
            </div>
            <div class="login-text">Selamat Datang</div>
            <div class="login-text text2">Masuk Untuk Melanjutkan</div>
          </div>
          <span class="label-login">NIK</span>
          <base-input
          id="login_nik"
          type="numberonly"
          v-model="nik"
          placeholder="NIK"
          />
          <!-- <span class="label-login">Nama</span>
          <base-input
          id="login_nama"
          type="text"
          v-model="nama"
          placeholder="Nama"
          />
          <span class="label-login">Jabatan</span>
          <base-input
          id="login_jabatan"
          type="text"
          v-model="jabatan"
          placeholder="Jabatan"
          /> -->
          <span class="label-login">Kode Cabang</span>
          <base-select
          id="login_kodeCabang"
          type="cbx"
          :options="branchOptions"
          v-model="kodeCabang"
          placeholder="Kode Cabang"
          @change="kodeCabangChanged"
          />
          <span class="label-login">Nama Cabang</span>
          <base-input
          id="login_namaCabang"
          type="text"
          v-model="namaCabang"
          placeholder="Nama Cabang"
          :readonly="true"
          />
          <span class="label-login">Password</span>
          <base-input
          id="login_password"
          type="password"
          v-model="password"
          placeholder="Password"
          />
          <base-button :isDisabled="disableButton" @click="loginCliked">Login</base-button>
          <transition name="validateLogin">
            <p class="not-valid-message" v-if="!isValid">{{ warningMessage }}</p>
          </transition>
      </div>
  </div>
</template>

<script>
import EGRBaseInput from "@/components/FormsElement/EvaluatorGR/EGRBaseInput.vue";
import EGRBaseSelect from "@/components/FormsElement/EvaluatorGR/EGRBaseSelect.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import { VALIDATOR_EXACTLENGTH, VALIDATOR_REQUIRE } from "@/shared/utils/validators";
import { mapMutations, mapGetters } from 'vuex';
import EvaluatorGRuser from "@/service/EvaluatorGR/common/user";
import EvaluatorGRcabang from "@/service/EvaluatorGR/common/cabang";

export default {
  components: {
    "base-input": EGRBaseInput,
    "base-button": BaseButton,
    "base-select":EGRBaseSelect
  },
  data() {
    return {
      nik: {
        value: "",
        isValid: false,
        error: "",
        validators: [VALIDATOR_REQUIRE()],
      },
      nama: {
        value: "",
        isValid: false,
        error: "",
      },
      password: {
        value: "",
        isValid: false,
        error: "",
        validators: [VALIDATOR_REQUIRE()],
      },
      jabatan: {
        value: "",
        isValid: false,
        error: "",
      },
      kodeCabang: {
        value: "",
        isValid: false,
        error: "",
        validators: [VALIDATOR_EXACTLENGTH(4), VALIDATOR_REQUIRE()],
      },
      namaCabang: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      branchOptions:[
        {text:"Pilih Cabang", value:""}
      ],
      dataCabang:[],
      warningMessage: "",
      isValid: true,
    };
  },
  created(){
    this.getAllCabang();
  },
  methods:{
    ...mapMutations([
        "loginNik", "login"
    ]),
    async loginCliked(){
      this.loginNik({nik: this.nik.value, brid: this.kodeCabang.value});
      let reqBody = {
          nik:this.nik.value,
          cabang:this.kodeCabang.value,
          password:this.password.value
      }
      let response = await EvaluatorGRuser.loginFunction(reqBody);
      if(response.data !== null && response.data.status !== undefined){
        if(response.data.status === 200){
          this.login();
          this.$router.push("/contact-care/create");
          this.warningMessage = "";
          this.isValid = true;
        }else{
          this.warningMessage = response.data.message;
          this.isValid = false;
        }
      }
    },
    async getAllCabang(){
      const response = await EvaluatorGRcabang.findAllCabang();
      this.dataCabang = response.data.data;
      this.branchOptions = this.branchOptions.concat(this.dataCabang.map(item=> {
        return {text:item.branId+" - "+item.branName, value:item.branId}
      }));
    },
    getSelectedNamaCabang(code){
      return this.dataCabang.filter(item => {
        return item.branId == code;
      })[0].branName;
    },
    kodeCabangChanged(){
      this.namaCabang.value = this.getSelectedNamaCabang(this.kodeCabang.value);
    }
  },
  computed :{
    ...mapGetters([
        "getUser"
    ]),
    disableButton(){
        return !(this.nik.isValid && this.namaCabang.isValid && this.kodeCabang.isValid && this.password.isValid);
    },
  }
}
</script>

<style>
.login-card{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 54px;
    gap: 5px;
    width: 488px;
    left: 38vw;
    top: 154px;

    background: #FFFFFF;
    border-radius: 16px;
}

.login-container{
    background-image: url("~@/assets/images/Background-Page.png");
    min-height: 100vh;
}

.login-container .form-control{
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px 14px;
    gap: 10px;

    width: 380px;
    height: 44px;

    background: #FFFFFF;
    /* Gray/300 */

    border: 1px solid #D0D5DD;
    border-radius: 8px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.login-container button{
    /* Button */
    /* Auto layout */
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;

    width: 380px;
    height: 46px;

    /* Primary/300 */

    background: #FFDD00;
    border-radius: 100px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
}

.login-logo{
    /* logo-Adira 2 */
    width: 124px;
    height: 32px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    margin-bottom: 15px;
}

.label-login{
    padding-left: 5px;
    padding-top: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
}

.not-valid-message {
  color: red;
  padding: 0;
  margin: 0;
  padding-top: 5px;
}

.login-text{
    /* Selamat Datang */

/* H1 */

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 30px;
line-height: 38px;
/* identical to box height, or 127% */

display: flex;
align-items: center;

/* Gray/900 */

color: #101828;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
}

.text2{
    
font-size: 20px;
margin-bottom: 20px;
}


</style>