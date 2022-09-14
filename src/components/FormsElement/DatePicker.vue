<template>
  <div>
     <b-input-group>
      <b-form-input
        id="id"
        v-model="value.value"
        type="text"
        :placeholder="placeholder"
        autocomplete="off"
        v-bind:class="getClass"
        @keyup="inputChangesHandler"
        @change="inputChangesHandler"
        :readonly="readonly"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
          v-model="value.value"
          v-bind:class="getClass"
          button-only
          reset-button
          label-reset-button="Clear"
          right
          locale="en-US"
          aria-controls="id"
          @context="onContext"
          :readonly="readonly"
          @keyup="inputChangesHandler"
          @change="inputChangesHandler"
          :min="minDate"
          :max="maxDate"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
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
      default: "YYYY-MM-DD",
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
    minDate: {
      type: Date,
      required: false
    },
    maxDate: {
      type: Date,
      required: false
    }
  },
  emits: ["onChange", "input", "change"],
  data() {
    return {
      isJustCreated:true,
      formatted: '',
      selected: '',
      validatedOnWatch:false
    };
  },
  mounted(){
      if (this.validateOnCreate){
        if (this.value.error == ""){
          this.validation();
        }
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
        let isFormatValid = true;
        this.value.isValid = true;
        if (this.value.value != "" && this.selected.trim() == "" && !this.isJustCreated){
            this.value.isValid = false;
            this.value.error = "Tanggal tidak sesuai format! yyyy-mm-dd";
            isFormatValid = false;
        }

        if (this.value.validators.length > 0 && isFormatValid && (!this.isJustCreated || this.value.error == "")) {
            const text = this.value.value ? this.value.value : "";
            const [validity, validityMessage] = validate(text.toString(), this.value.validators);
            this.value.isValid = validity;
            this.value.error = validityMessage ? validityMessage : "";
        } else if (isFormatValid) {
          this.value.isValid = this.value.error == "" ? true : false;
        }

        if(this.isJustCreated){
            this.isJustCreated = false;
        }

        this.$emit("input", this.value);
        this.$emit("onChange");
        this.$emit("change");


    },
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.formatted = ctx.selectedFormatted;
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD;
      
      if (this.selected != ""){
        this.inputChangesHandler();
      }
        
    },
    inputChangesHandler(){        
        this.validatedOnWatch = false;
        this.validation();
    },
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
