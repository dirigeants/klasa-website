<template>
  <section class="section" :id="`doc-for-${scrollTo}`">
    <source-button :meta="method.meta" :docs="docs" />

    <h5 class="title is-5">
      <span class="tag is-primary" v-if="method.scope === 'static'" title="This method is on the class constructor function, not instances.">Static</span>
      <span class="tag is-success" v-if="method.readonly" title="This method cannot be modified.">Read-only</span>
      <span class="tag is-danger" v-if="method.deprecated" title="This method is deprecated, and may be removed in a future version.">Deprecated</span>
      <span class="tag is-warning" v-if="method.access === 'private'" title="This method is private, and may change or be removed at any time.">Private</span>
			<router-link :to="{ name: 'docs-class', query: { scrollTo } }">
				.{{ method.name }}(<!--
				--><span v-for="param in params" class="method-param" :class="param.optional ? 'optional' : ''"><!--
          -->{{ param.variable ? '...' : '' }}{{ param.name }}<!--
        --></span><!--
				-->)
			</router-link>
		</h5>

    <h6 class="subtitle is-6" v-html="description"></h6>

    <param-table v-if="method.params" :params="method.params" :docs="docs" />

    <strong>Returns:</strong>
    <span v-if="method.returns">
      <types v-for="rtrn in method.returns.types || method.returns" :names="rtrn" :variable="method.returns.variable" :nullable="method.returns.nullable" :docs="docs" :key="rtrn" />
    </span>
    <type-link v-else :type="['void']" :docs="docs" class="docs-type" />
    <p v-if="method.returns && method.returns.description">{{ method.returns.description }}</p>

    <div v-if="method.throws" class="method-throws">
      <strong>Throws:</strong>
      <types v-for="thrw in method.throws" :names="thrw" :docs="docs" :key="thrw" />
    </div>

    <div v-if="emits">
      <strong>Emits:</strong>
      <ul v-if="emits.length > 1">
        <li v-for="event in emits">
          <router-link :to="event.link" class="docs-type">{{ event.text }}</router-link>
        </li>
      </ul>
      <router-link v-else :to="emits[0].link" class="docs-type">{{ emits[0].text }}</router-link>
    </div>

    <div v-if="method.examples">
      <strong>Examples:</strong>
      <pre v-for="example in method.examples" v-highlightjs><code class="javascript">{{ example }}</code></pre>
    </div>

    <see v-if="method.see" :see="method.see" :docs="docs" />
  </section>
</template>

<script>
  import Vue from 'vue';
  import Types from '../Types.vue';
  import TypeLink from '../TypeLink.vue';
  import ParamTable from './ParamTable.vue';
  import SourceButton from '../SourceButton.vue';
  import See from '../See.vue';
  import { convertLinks, parseLink } from '../../../util';

  export default {
    name: 'class-method',
    props: ['method', 'docs'],
    components: {
      Types,
      TypeLink,
      ParamTable,
      SourceButton,
      See,
    },

    computed: {
      params() {
        if (!this.method.params) return null;
        return this.method.params.filter(p => !p.name.includes('.'));
      },

      description() {
        return Vue.filter('marked')(convertLinks(this.method.description, this.docs, this.$router, this.$route));
      },

      emits() {
        if (!this.method.emits) return null;
        return this.method.emits.map(e => parseLink(e.replace(/:event/i, ''), this.docs));
      },

      scrollTo() {
        return `${this.method.scope === 'static' ? 's-' : ''}${this.method.name}`;
      },
    },
  };
</script>

