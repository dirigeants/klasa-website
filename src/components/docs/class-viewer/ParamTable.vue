<template>
  <div class="param-table-wrapper">
    <table class="param-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th v-if="hasOptional">Optional</th>
          <th v-if="hasOptional">Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param in params">
          <td>{{ param.name }}</td>
          <td><types v-for="type in param.type" :names="type" :variable="param.variable" :nullable="param.nullable" :docs="docs" :key="type" /></td>
          <td v-if="hasOptional">
            <em class="fa fa-check" v-if="param.optional"></em>
          </td>
          <td v-if="hasOptional">
            <em v-if="param.optional && typeof param.default === 'undefined'">none</em>
            <span v-else v-html="paramDefault(param)"></span>
          </td>
          <td v-html="paramDescription(param)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Types from '../Types.vue';
  import { convertLinks } from '../../../util';

  export default {
    name: 'param-table',
    props: ['params', 'docs'],
    components: {
      Types,
    },

    computed: {
      hasOptional() {
        return this.params.some(p => p.optional);
      },
    },

    methods: {
      paramDescription(param) {
        return Vue.filter('marked')(convertLinks(param.description, this.docs, this.$router, this.$route));
      },

      paramDefault(param) {
        return param.optional ? `<code>${param.default}</code>` : '';
      },
    },
  };
</script>

