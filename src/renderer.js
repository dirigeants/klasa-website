import { Renderer } from 'marked';
import highlightjs from 'highlight.js';

// Create your custom renderer.
const renderer = new Renderer();

// Highlight.js
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlightjs.getLanguage(language));
  // Highlight only if the language is valid.
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

renderer.table = (header, body) => `
  <table class="table is-striped is-narrow">
    <thead>
      ${header}
    </thead>
    <tbody>
      ${body}
    </tbody>
  </table>
`;

renderer.heading = (text, level, raw) => `
  <h${level} class="title" id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">
    ${text}
  </h${level}>
`;

export default renderer;
