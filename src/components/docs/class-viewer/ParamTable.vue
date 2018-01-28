<template>
  <b-table :data="params" :striped="true" :narrowed="true" :mobile-cards="false" detailed>
    <template slot-scope="props">
        <b-table-column label="Parameter">
            {{ props.row.name }}
        </b-table-column>

        <b-table-column label="Type">
          <span v-for="(type, index) of props.row.type" :key="type">
            <types :names="type" :variable="props.row.variable" :nullable="props.row.nullable" :docs="docs" />
            <span v-if="index < props.row.type.length - 1"> | </span>
          </span>
        </b-table-column>

        <b-table-column v-if="hasOptional" label="Optional">
            <b-icon icon="check" v-if="props.row.optional" />
        </b-table-column>

        <b-table-column v-if="hasOptional" label="Default">
          <em v-if="props.row.optional && typeof props.row.default === 'undefined'">none</em>
          <span v-else v-html="paramDefault(props.row)"></span>
        </b-table-column>
    </template>
    <template slot="detail" slot-scope="props">
      <div v-html="paramDescription(props.row)"></div>
    </template>
  </b-table>
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

