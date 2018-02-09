import { resolve as resolveURL } from 'url';

// Creates a full URL for a GitHub source view
export function sourceURL(url, tag, path, file, line) {
	return resolveURL(url, `${tag}/${path}${file ? `/${file}` : ''}${line ? `#L${line}` : ''}`);
}

// Converts a JSDoc link value to an object of link information
export function parseLink(link, docs) {
	const matches = link.match(/\{@(?:link|tutorial)\s+(.+?)(?:\s+(.+?))?\s*\}/i);
	if (matches) [, link] = matches;
	const text = matches ? matches[2] : null;

	// Type link
	const split = link.split(/(\.|#)/);
	if (docs.links[split[0]]) {
		return {
			text: text || link,
			link: typeof docs.links[split[0]] === 'object' ?
				{
					name: docs.links[split[0]].name,
					params: docs.links[split[0]].params,
					query: { scrollTo: split[1] ? `${split[1] === '.' ? 's-' : ''}${split[2]}` : undefined }
				} : docs.links[split[0]]
		};
	}

	// Any link
	if (link.match(/^https?:\/\//i)) {
		return {
			text: text || link,
			link: link
		};
	}

	// Plain text
	return { text: text || link };
}

// Converts all JSDoc links to markdown links
export function convertLinks(text, docs, router, route) {
	if (!text) return null;

	return text.replace(/\{@(?:link|tutorial)\s+(.+?)(?:\s+(.+?))?\s*\}/gi, match => {
		const parsed = parseLink(match, docs);
		if (parsed.link) {
			let link;
			if (typeof parsed.link === 'object') {
				if (!parsed.link.params) parsed.link.params = {};
				parsed.link.params.source = route.params.source;
				parsed.link.params.tag = route.params.tag;
				if (parsed.link.name === 'docs-file') {
					const { category, file } = parsed.link.params;
					parsed.text = docs.custom[category].files[file].name;
				}
				link = router.resolve(parsed.link).href;
			} else {
				// eslint-disable-next-line prefer-destructuring
				link = parsed.link;
			}
			if (parsed.text.startsWith('external:')) parsed.text = parsed.text.slice(9);
			return `[${parsed.text}](${link})`;
		}
		return parsed.text;
	});
}
