<template>
  <div id="docs-body">
    <transition name="fade-resize" mode="out-in">
      <router-view v-if="docs" :docs="docs" />
      <slide v-else>
        <loading v-if="!error" />
        <p v-else id="docs-error">
          Couldn't load the documentation data.
          <pre>{{ error.toString() }}</pre>
        </p>
      </slide>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'docs-loader',
    props: ['source', 'tag'],

    data() {
      return {
        docs: null,
        error: null,
        loadingTag: null,
      };
    },

    methods: {
      loadDocs() {
        if (this.loadingTag === this.tag) return;
        this.docs = null;
        this.error = null;

        const startSource = this.source;
        const startTag = this.tag;
        this.loadingTag = this.tag;

        this.source.fetchDocs(this.tag).then(docs => {
          if (this.source !== startSource || this.tag !== startTag) return;
          console.log('Loading', startSource, startTag);

          // Sort everything
          docs.classes.sort((a, b) => a.name.localeCompare(b.name));
          docs.typedefs.sort((a, b) => a.name.localeCompare(b.name));
          for (const c of docs.classes) {
            if (c.props) c.props.sort((a, b) => a.name.localeCompare(b.name));
            if (c.methods) c.methods.sort((a, b) => a.name.localeCompare(b.name));
            if (c.events) c.events.sort((a, b) => a.name.localeCompare(b.name));
          }

          // Built-in type links
          docs.links = {
            string: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
            number: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
            boolean: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
            symbol: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
            void: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined',
            Object: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',
            Function: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function',
            function: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function',
            Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
            Set: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
            Map: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
            Date: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
            RegExp: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
            Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
            Error: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
            EventEmitter: 'https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter',
            Timeout: 'https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout',
            Buffer: 'https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_class_buffer',
            ReadableStream: 'https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable',
            ChildProcess: 'https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_class_childprocess',
          };

          // Add links for everything
          docs.externals = docs.externals || [];
          docs.classes = docs.classes || [];
          docs.typedefs = docs.typedefs || [];
          for (const x of docs.externals) docs.links[x.name] = x.see[0].replace(/\{@link\s+(.+?)\s*\}/i, '$1');
          for (const c of docs.classes) docs.links[c.name] = { name: 'docs-class', params: { class: c.name } };
          for (const t of docs.typedefs) docs.links[t.name] = { name: 'docs-typedef', params: { typedef: t.name } };

          // Workaround for the single use of inter-source see also linking
          if (this.source.id === 'commando') {
            docs.links.Message = { name: 'docs-class', params: { source: 'main', tag: 'master', class: 'Message' } };
          }

          docs.global = this.source.global;
          docs.source = this.source.source;
          docs.tag = this.tag;
          this.docs = docs;
          this.loadingTag = null;
          console.log('Finished loading', startSource, startTag);
        }).catch(err => {
          console.error('Error while loading', startSource, startTag, err);
          this.error = err;
          this.loadingTag = null;
        });
      },

      scroll(fromRoute) {
        if (this.$route.query.scrollTo && this.docs) {
          const scroll = () => {
            let el = document.getElementById(`doc-for-${this.$route.query.scrollTo}`);
            if (!el) el = document.getElementById(this.$route.query.scrollTo);
            if (!el) return;
            el.setAttribute('data-scrolled', true);
            setTimeout(() => el.setAttribute('data-scrolled', false), 1000);
            el.scrollIntoView(true);
            window.scrollBy(0, -50);
          };

          const delayScroll = fromRoute && (
            this.$route.name !== fromRoute.name ||
            this.$route.params.class !== fromRoute.params.class ||
            this.$route.params.typedef !== fromRoute.params.typedef ||
            this.$route.params.file !== fromRoute.params.file
          );
          if (delayScroll) setTimeout(scroll, 400);
          else scroll();
        }
      },
    },

    watch: {
      source() {
        this.loadDocs();
      },

      tag() {
        this.loadDocs();
      },

      docs(to, from) {
        if (!from) setTimeout(this.scroll, 600);
      },

      $route(to, from) {
        this.scroll(from);
      },
    },

    created() {
      this.loadDocs();
    },

    mounted() {
      this.$nextTick(this.scroll);
    },
  };
</script>
