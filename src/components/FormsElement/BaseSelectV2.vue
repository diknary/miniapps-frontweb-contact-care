<template>
  <div>
    <select v-bind:id="id" v-model="value.value" v-bind:class="getClass" @change="inputChangesHandler" v-bind:readonly="readonly" :disabled="readonly">
        <option v-for="(item, index) in options" :value="item" :key="index">{{item.text}}</option>
    </select>
    <transition name="validate">
      <p class="not-valid-message" v-if="!isValid">{{ value.error }}</p>
    </transition>
  </div>
</template>

<script>
import { validate } from "@/shared/utils/validators";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value:{
        type: Object,
        default: function(){
            return{
                value:"",
                validators:[],
                error:"",
                isValid:true
            };
        }
    },
    validateOnCreate: {
      type: Boolean,
      default: false,
    },
    options:{
        type:Array,
        default:function(){
            return[{value:"", text:"No data"}]
        }
    },
  },
  emits: ["onChange", "input", "change"],
  data() {
    return {
      isJustCreated:true,
      validatedOnWatch:false
    };
  },
  computed:{
      getClass(){
          return [{"form-control":true}, {'not-valid': !this.isValid}]
      },
      isValid(){
          return (this.value.isValid && !this.isJustCreated) ||  this.value.error == "";
      }
  },
  mounted(){
      if (this.validateOnCreate){
          this.validation();
      }
  },
  methods:{
      validation() {
        if (this.value.validators.length > 0  && (!this.isJustCreated || this.value.error == "")) {
            const text = this.value.value ? this.value.value : "";
            const [validity, validityMessage] = validate(text.toString(), this.value.validators);
            this.value.isValid = validity;
            this.value.error = validityMessage ? validityMessage : "";
        } else {
          this.value.isValid = this.value.error == "" ? true : false;
        }
        this.$emit("input", this.value);
        this.$emit("onChange", {value: this.value.value, isValid: this.value.isValid}); //aci phase 2
        this.$emit("change");

        if (this.isJustCreated){
            this.isJustCreated = false;
        }
    },
    inputChangesHandler(){
        this.validatedOnWatch = false;
        this.validation();
    }
  },
  watch: {
    'value.validators': function(){
      if (!this.validatedOnWatch && !this.isJustCreated){
        this.validation();
        this.validatedOnWatch = true;
      }
    },
  }
};
</script>

<style scoped>
.not-valid {
  border-color: red;
}
.not-valid-message {
  color: red;
  padding: 0;
  margin: 0;
  padding-top: 5px;
  text-align: left;
}

.validate-enter-active,
.validate-leave-active {
  transition: opacity 0.5s;
}
.validate-enter, .validate-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
