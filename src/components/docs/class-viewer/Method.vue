<template>

  <div class="card" :id="`doc-for-${scrollTo}`">
    <header class="card-header">
      <p class="card-header-title">
        <span class="tag is-primary" v-if="method.scope === 'static'" title="This method is on the class constructor function, not instances.">Static</span>
        <span class="tag is-success" v-if="method.readonly" title="This method cannot be modified.">Read-only</span>
        <span class="tag is-danger" v-if="method.deprecated" title="This method is deprecated, and may be removed in a future version.">Deprecated</span>
        <span class="tag is-warning" v-if="method.access === 'private'" title="This method is private, and may change or be removed at any time.">Private</span>
        <router-link :to="{ name: 'docs-class', query: { scrollTo } }">
          .{{ method.name }}({{params}})
        </router-link>
      </p>
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
            <types v-for="rtrn in method.returns.types || method.returns" :names="rtrn" :variable="method.returns.variable" :nullable="method.returns.nullable" :docs="docs" :key="rtrn" />
          </span>
          <type-link v-else :type="['void']" :docs="docs" />
        </span>
      </p>
      <p v-if="method.throws" class="card-footer-item">
        <span>
          <strong>Throws:</strong> <types v-for="thrw in method.throws" :names="thrw" :docs="docs" :key="thrw" />
        </span>
      </p>
      <p v-if="method.see" class="card-footer-item">
        <see :see="method.see" :docs="docs" />
      </p>
    </footer>
  </div>

<!--
  <section class="section" :id="`doc-for-${scrollTo}`">
    <source-button :meta="method.meta" :docs="docs" />

    <h5 class="title is-5">
      <span class="tag is-primary" v-if="method.scope === 'static'" title="This method is on the class constructor function, not instances.">Static</span>
      <span class="tag is-success" v-if="method.readonly" title="This method cannot be modified.">Read-only</span>
      <span class="tag is-danger" v-if="method.deprecated" title="This method is deprecated, and may be removed in a future version.">Deprecated</span>
      <span class="tag is-warning" v-if="method.access === 'private'" title="This method is private, and may change or be removed at any time.">Private</span>
			<router-link :to="{ name: 'docs-class', query: { scrollTo } }">
				.{{ method.name }}({{params}})
			</router-link>
		</h5>

    <h6 class="subtitle is-6" v-html="description"></h6>

    <param-table v-if="method.params" :params="method.params" :docs="docs" />

    <strong>Returns:</strong>
    <span v-if="method.returns">
      <types v-for="rtrn in method.returns.types || method.returns" :names="rtrn" :variable="method.returns.variable" :nullable="method.returns.nullable" :docs="docs" :key="rtrn" />
    </span>
    <type-link v-else :type="['void']" :docs="docs" />
    <p v-if="method.returns && method.returns.description">{{ method.returns.description }}</p>

    <div v-if="method.throws">
      <strong>Throws:</strong>
      <types v-for="thrw in method.throws" :names="thrw" :docs="docs" :key="thrw" />
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

    <see v-if="method.see" :see="method.see" :docs="docs" />
  </section>
-->
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

