<template>
  <div class="vue-query-builder">
    <slot v-bind="vqbProps">
      <query-builder-group
        v-bind="vqbProps"
        v-model:query="query"
      />
    </slot>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import QueryBuilderGroup from './layouts/Bootstrap/BootstrapGroup.vue';
import deepClone from './utilities.js';

var defaultLabels = {
  matchType: "Match Type",
  matchTypes: [
    {"id": "all", "label": "All"},
    {"id": "any", "label": "Any"},
  ],
  addRule: "Add Rule",
  removeRule: "&times;",
  addGroup: "Add Group",
  removeGroup: "&times;",
  textInputPlaceholder: "value",
};

export default {
  name: 'VueQueryBuilder',
  components: {
    QueryBuilderGroup
  },
  props: {
    rules: Array,
    labels: {
      type: Object,
      default () {
        return defaultLabels;
      }
    },
    maxDepth: {
      type: Number,
      default: 6,
      validator: function (value) {
        return value >= 1
      }
    },
    modelValue: Object
  },
  emits: ['update:modelValue'],
  data () {
    return {
      query: {
        logicalOperator: null,
        children: []
      },
      ruleTypes: {
        "text": {
          operators: ['equals','does not equal','contains','does not contain','is empty','is not empty','begins with','ends with'],
          inputType: "text",
          id: "text-field"
        },
        "numeric": {
          operators: ['=','<>','<','<=','>','>='],
          inputType: "number",
          id: "number-field"
        },
        "custom": {
          operators: [],
          inputType: "text",
          id: "custom-field"
        },
        "radio": {
          operators: [],
          choices: [],
          inputType: "radio",
          id: "radio-field"
        },
        "checkbox": {
          operators: [],
          choices: [],
          inputType: "checkbox",
          id: "checkbox-field"
        },
        "select": {
          operators: [],
          choices: [],
          inputType: "select",
          id: "select-field"
        },
        "multi-select": {
          operators: ['='],
          choices: [],
          inputType: "select",
          id: "multi-select-field"
        },
      }
    }
  },
  computed: {
    mergedLabels () {
      return Object.assign({}, defaultLabels, this.labels);
    },
    mergedRules () {
      var mergedRules = [];
      var that = this;

      that.rules?.forEach(function(rule){
        if ( typeof that.ruleTypes[rule.type] !== "undefined" ) {
          mergedRules.push( Object.assign({}, that.ruleTypes[rule.type], rule) );
        } else {
          mergedRules.push( rule );
        }
      });

      return mergedRules;
    },
    vqbProps () {
      return {
        index: 0,
        depth: 1,
        maxDepth: this.maxDepth,
        ruleTypes: this.ruleTypes,
        rules: this.mergedRules,
        labels: this.mergedLabels
      }
    }
  },
  watch: {
    'query': {
        deep: true,
        handler(newQuery) {
            if (JSON.stringify(newQuery) !== JSON.stringify(this.value)) {
              this.$emit('update:modelValue', deepClone(newQuery));
            }
        },
    },
    'value': {
        deep: true,
        handler(newValue) {
            if (JSON.stringify(newValue) !== JSON.stringify(this.query)) {
              this.query = deepClone(newValue);
            }

        }
    }
  },
  mounted () {
    if ( typeof this.value !== "undefined" ) {
      this.query = Object.assign(this.query, this.value);
    }
  }
}
</script>
