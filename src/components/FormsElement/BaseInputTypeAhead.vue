<template>
  <div>
    <vue-autosuggest
      ref="autosuggest"
      v-model="query"
      v-bind:suggestions="filteredSuggestions"
      v-bind:inputProps="inputProps"
      v-bind:section-configs="sectionConfigs"
      v-bind:getSuggestionValue="(s) => s.item.text"
      v-bind:class="className"
      v-on:selected="selectHandler"
      v-on:blur="onBlur"
    >
      <template slot-scope="{ suggestion }">
        <div>
          <span>{{ suggestion.item.text }}</span>
          <p class="text-desc">{{ suggestion.item.desc }}</p>
          <!-- {{ suggestion.item.topping.map((topping) => topping.type).join(", ") }} -->
        </div>
      </template>
      <template slot="after-input">
        <transition name="validate">
          <p class="not-valid-message" v-if="message != null">{{ message }}</p>
        </transition>
      </template>
    </vue-autosuggest>
  </div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import axios from "axios";
import _ from "lodash";
import { validate } from "../../shared/utils/validators";
import { mapMutations } from "vuex";

export default {
  components: {
    "vue-autosuggest": VueAutosuggest,
  },
  props: {
    className: String,
    id: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
    validators: {
      type: Array,
      default: function() {
        return [];
      },
    },
    autofill: {
      type: String,
      default: "",
    },
  },
  emits: ["onChange"],
  data() {
    return {
      query: "",
      suggestions: [],
      selected: null,
      isValid: true,
      message: null,
      API_URL: "",
      inputProps: {
        id: "autosuggest__input",
        class: "form-control form-control-sm",
      },
      sectionConfigs: {
        default: {
          limit: 50,
        },
      },
    };
  },
  computed: {
    filteredSuggestions() {
      return [
        {
          data: this.suggestions.filter((item) => {
            return (
              item.text.toLowerCase().indexOf(this.query.toLowerCase()) > -1
            );
          }),
        },
      ];
    },
  },
  methods: {
    ...mapMutations({
      updateDataBaru: "updateDataBaru",
    }),
    selectHandler(item) {
      if (item) {
        this.selected = item.item;
        if (this.validators.length > 0) {
          const [validity, validityMessage] = validate(
            this.selected.text,
            this.validators
          );
          this.isValid = validity;
          this.message = validityMessage;
          this.$emit("onChange", { value: this.selected, isValid: validity });
        }
      }
    },
    onBlur: _.debounce(function() {
      if (this.selected) {
        const [validity, validityMessage] = validate(
          this.selected.text,
          this.validators
        );
        this.isValid = validity;
        this.message = validityMessage;
        this.$emit("onChange", { value: this.selected, isValid: validity });
      } else {
        const [validity, validityMessage] = validate(
          this.query,
          this.validators
        );
        this.isValid = validity;
        this.message = validityMessage;
        if (this.isValid && !this.selected) {
          this.isValid = false;
          this.message = `Pilihan data tidak ditemukan atau area belum terdaftar.`;
        }
        this.$emit("onChange", { value: this.selected, isValid: false });
      }
    }, 700),
    getSuggestions(query) {
      axios({
        method: "POST",
        url: this.API_URL,
        data: {
          refOne: query,
        },
        timeout: 120000,
      })
        .then((res) => {
          this.suggestions = res.data;
        })
        .catch((error) => {
          console.log(error);
          this.suggestions = [];
        });
    },
  },
  created() {
    this.API_URL =
      process.env.VUE_APP_AMANACI_URI +
      // process.env.VUE_APP_AMANACI_PORT +
      this.link.trim();
  },
  watch: {
    query: _.debounce(function(search) {
      this.selected = null;
      this.$emit("onChange", { value: null, isValid: false });
      if (search.trim() !== "") {
        this.getSuggestions(search);
      }
    }, 500),
    autofill: function (search) {
      //aci phase 2
      this.query = search;
      this.selected = null;
      this.$emit("onChange", { value: null, isValid: false });
      if (search.trim() !== "") {
        this.getSuggestions(search);
      }
    },
  },
};
</script>

<style>
.not-valid {
  border-color: red;
}
.not-valid-message {
  color: red;
  padding: 0;
  margin: 0;
  padding-top: 5px;
}

.validate-enter-active,
.validate-leave-active {
  transition: opacity 0.5s;
}

.validate-enter,
.validate-leave-to {
  opacity: 0;
}

.text-desc {
  font-size: 11px;
  padding: 0;
  margin: 0;
}

#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  border: 1px solid #616161;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  max-height: 400px;
  overflow-y: scroll;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results-item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results-before {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results-item:active,
.autosuggest__results .autosuggest__results-item:hover,
.autosuggest__results .autosuggest__results-item:focus,
.autosuggest__results
  .autosuggest__results-item.autosuggest__results-item--highlighted {
  background-color: #f6f6f6;
}
</style>
