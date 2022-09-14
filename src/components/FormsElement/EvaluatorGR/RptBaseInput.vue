<template>
  <div>
    <input
      v-if="type === 'numberonly'"
      v-bind:id="id"
      type="text"
      v-model="value.value"
      v-bind:class="getClass"
      v-bind:placeholder="placeholder"
      v-bind:readonly="readonly"
      v-bind:onblur="onblur"
      v-bind:onfocus="onfocus"
      @change="inputChangesHandler"
      @keyup="inputChangesHandler"
      oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');"
    />
    <b-form-textarea
      v-else-if="type === 'textarea'"
      :id="id"
      v-model="value.value"
      :rows="rows"
      :max-rows="maxrows"
      v-bind:class="getClass"
      v-bind:placeholder="placeholder"
      v-bind:readonly="readonly"
      v-bind:onblur="onblur"
      v-bind:onfocus="onfocus"
      @change="inputChangesHandler"
      @keyup="inputChangesHandler"
      oninput="this.value = this.value.toUpperCase();"
    ></b-form-textarea>
    <input
      v-else
      v-bind:id="id"
      v-bind:type="type"
      v-model="value.value"
      v-bind:class="getClass"
      v-bind:placeholder="placeholder"
      v-bind:readonly="readonly"
      v-bind:onblur="onblur"
      v-bind:onfocus="onfocus"
      @change="inputChangesHandler"
      @keyup="inputChangesHandler"
      oninput="this.value = this.value.toUpperCase();"
    />
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
      default: "Input text",
    },
    maxrows: {
      type: String,
      default: "3",
    },
    type: {
      type: String,
      default: "text",
    },
    text: {
      type: String,
      default: "",
    },
    rows: {
      type: String,
      default: "3",
    },
    validateOnCreate: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },  
    value:{
        type:Object,
        default:function(){
            return {
                value:"",
                isValid:true,
                error:"",
                validators:[]
            }
        }
    },
    onblur:{},
    onfocus:{}
  },
  emits: ["onChange", "input", "change"],
  data() {
    return {
      isJustCreated:true,
      validatedOnWatch:false
    };
  },
  mounted(){
      if (this.validateOnCreate){
          this.validation();
      }
  },
  computed:{
      getClass(){
          //return "form-control" + " not-valid"; //{ 'not-valid': !isValid }
          return [{"form-control":true}, {'not-valid': !this.isValid}]
      },
      isValid(){
          return (this.value.isValid && !this.isJustCreated) ||  this.value.error == "";
      }
  },
  methods:{
    validation() {
        if (this.value.validators.length > 0 && (!this.isJustCreated || this.value.error == "")) {
            const text = this.value.value ? this.value.value : "";
            const [validity, validityMessage] = validate(text.toString(), this.value.validators);
            this.value.isValid = validity;
            this.value.error = validityMessage ? validityMessage : "";
        } else {
          this.value.isValid = this.value.error == "" ? true : false;
        }
        
        this.$emit("input", this.value);
        this.$emit("onChange",);
        this.$emit("change",);
        
        if(this.isJustCreated){
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
