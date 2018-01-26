<template>
  <b-table :data="params" :striped="true" :narrowed="true" :mobile-cards="false">
    <template slot-scope="props">
        <b-table-column label="Parameter">
            {{ props.row.name }}
        </b-table-column>

        <b-table-column label="Type">
          <types v-for="type in props.row.type" :names="type" :variable="props.row.variable" :nullable="props.row.nullable" :docs="docs" :key="type" />
        </b-table-column>

        <b-table-column v-if="hasOptional" label="Optional">
            <b-icon icon="check" v-if="props.row.optional" />
        </b-table-column>

        <b-table-column v-if="hasOptional" label="Default">
          <em v-if="props.row.optional && typeof props.row.default === 'undefined'">none</em>
          <span v-else v-html="paramDefault(param)"></span>
        </b-table-column>
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

