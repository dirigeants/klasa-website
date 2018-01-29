<template>
  <div class="card" :id="`doc-for-${scrollTo}`">
    <header class="card-header">
      <nav class="card-header-title level is-marginless">
        <div class="level-left">
          <div class="level-item has-text-left">
            <span v-if="method.scope === 'static'"><span class="tag is-primary" title="This method is on the class constructor function, not instances.">Static</span>&nbsp;</span>
            <span v-if="method.readonly"><span class="tag is-success" title="This method cannot be modified.">Read-only</span>&nbsp;</span>
            <span v-if="method.deprecated"><span class="tag is-danger" title="This method is deprecated, and may be removed in a future version.">Deprecated</span>&nbsp;</span>
            <span v-if="method.access === 'private'"><span class="tag is-warning" title="This method is private, and may change or be removed at any time.">Private</span>&nbsp;</span>
          </div>
          <span class="level-item has-text-left is-marginless">
            <router-link :to="{ name: 'docs-class', query: { scrollTo } }">.{{ method.name }}({{params}})</router-link>
          </span>
        </div>
      </nav>
      <source-button class="card-header-icon" :meta="method.meta" :docs="docs" />
    </header>
    <div class="card-content">
      <div class="content" v-html="description"></div>
      
      <div v-if="method.params">
        <param-table :params="method.params" :docs="docs" />
        <br />
      </div>

      <div v-if="emits">
        <strong>Emits:</strong>
        <ul v-if="emits.length > 1">
          <li v-for="event in emits" :key="event">
            <router-link :to="event.link">{{ event.text }}</router-link>
          </li>
        </ul>
        <router-link v-else :to="emits[0].link">{{ emits[0].text }}</router-link>
      </div>

      <div v-if="method.examples">
        <strong>Examples:</strong>
        <pre v-for="example in method.examples" :key="example" v-highlightjs><code class="javascript">{{ example }}</code></pre>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          <strong>Returns:</strong>
          <span v-if="method.returns">
            <span v-for="(rtrn, index) of method.returns.types || method.returns" :key="rtrn">
              <types :names="rtrn" :variable="method.returns.variable" :nullable="method.returns.nullable" :docs="docs" />
              <span v-if="index < (method.returns.types || method.returns).length - 1"> | </span>
            </span>
          </span>
          <type-link v-else :type="['void']" :docs="docs" />
        </span>
      </p>
      <p v-if="method.throws" class="card-footer-item">
        <span>
          <strong>Throws:</strong>
          <span v-for="(thrw, index) of method.throws" :key="thrw">
            <types :names="thrw" :docs="docs" />
            <span v-if="index < method.throws.length - 1"> | </span>
          </span>
        </span>
      </p>
      <p v-if="method.see" class="card-footer-item">
        <see :see="method.see" :docs="docs" />
      </p>
    </footer>
  </div>
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
        return this.method.params.filter(p => !p.name.includes('.'))
          .map(p => {
            let param = p.name;
            if (param.variable) param = `...${param}`;
            if (param.optional) param = `[${p.name}]`;
            return param;
          })
          .join(', ');
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

