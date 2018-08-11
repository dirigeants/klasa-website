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

renderer.heading = (text, level) => {
	const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

	return `
			<br>
			<nav class="level is-mobile">
				<div class="level-left">
					<div class="level-item">
						<h${level} id="${escapedText}">${text}</h${level}>
					</div>
				</div>
				${level < 3 ? `
						<div class="level-right">
							<div class="level-item has-text-right">
								<h${level}><a href="${window.location.toString().split('?')[0]}?scrollTo=${escapedText}">#</a></h${level}>
							</div>
						</div>
					` : ''}
			</nav>
		`;
};

renderer.table = (header, body) => `
	<div style="overflow-x:auto;">
		<table>
			<thead>
				${header}
			</thead>
			<tbody>
				${body}
			</tbody>
		</table>
	</div>
`;

export default renderer;
