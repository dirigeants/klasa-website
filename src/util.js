import { resolve as resolveURL } from 'url';

// Creates a full URL for a GitHub source view
export function sourceURL(url, tag, path, file, line) {
	return resolveURL(url, `${tag}/${path}${file ? `/${file}` : ''}${line ? `#L${line}` : ''}`);
}

// Converts a JSDoc link value to an object of link information
export function parseLink(link, text, docs) {
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

// Make a MD link
export function mdLink(parsed, docs, router, route) {
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

// Convert types to a md link string
export function typeLinks(types, docs, router, route) {
	return types.map(current =>
		current.map(cur => Array.isArray(cur) ?
			cur.map((cu, i) =>
				i ? cu : mdLink(parseLink(cu, undefined, docs), docs, router, route)
			).join('') : cur
		).join('')
	).join(' &#124; ').replace(/</g, '&#60;');
}

// Converts all JSDoc links to markdown links
export function convertLinks(text, docs, router, route) {
	if (!text) return null;

	return text
		.replace(/\{@(?:link|tutorial)\s+(.+?)(?:\s+(.+?))?\s*\}/gi, (match, link, txt) => {
			const parsed = parseLink(link, txt, docs);
			if (parsed.link) return mdLink(parsed, docs, router, route);
			return parsed.text;
		})
		.replace(/\{@typedef\s+(.+?)\}/gi, (match, p1) => {
			if (!p1) return match;
			const typedef = docs.typedefs.find(type => type.name === p1);
			if (!typedef || !typedef.props || !typedef.props.length) return match;
			const returnMessage = ['| Name | Default | Type | Description |', '| -- | -- | -- | -- |'];
			for (const prop of typedef.props) {
				returnMessage.push(`| **${prop.name}** | \`${prop.default}\` | ${typeLinks(prop.type, docs, router, route)} | ${prop.description} |`);
			}
			return returnMessage.join('\n');
		})
		.replace(/\{@scrollto\s+(.+?)\}/gi, (match, destination) => `[${destination}](/#${route.path}?scrollTo=${destination.toLowerCase().replace(/[^\w]+/g, '-')})`)
		.replace(/\{@branch\}/gi, route.params.tag || 'master');
}

export function paramListing(params) {
	let paramsNames = '';
	let bracketCounter = 0;
	let first = true;

	for (const par of params) {
		let { name } = par;
		if (par.variable) name = `...${name}`;
		if (par.optional) {
			paramsNames += `${first ? '' : ' '}[${first ? '' : ', '}${name}`;
			bracketCounter++;
		} else {
			paramsNames += `${first ? '' : ', '}${name}`;
		}
		first = false;
	}

	paramsNames += ']'.repeat(bracketCounter);

	return paramsNames;
}
