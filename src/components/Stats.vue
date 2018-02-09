<template>
	<nav class="columns is-mobile">
		<div class="column has-text-centered">
			<div>
				<p class="heading">Downloads</p>
				<p class="title is-size-5">{{ downloads }}</p>
			</div>
		</div>
		<div class="column has-text-centered">
			<div>
				<p class="heading">Stars</p>
				<p class="title is-size-5">{{ stars }}</p>
			</div>
		</div>
		<div class="column has-text-centered">
			<div>
				<p class="heading">Contributors</p>
				<p class="title is-size-5">{{ contributors }}</p>
			</div>
		</div>
	</nav>
</template>

<script>
import request from 'superagent';

const data = {
	downloads: '1,000+',
	stars: '20+',
	contributors: '19+',
	fetching: false
};

export default {
	name: 'Stats',

	data() {
		if (data.fetching) return data;
		data.fetching = true;

		request.get('https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/klasa').end((err, res) => {
			if (err) return;
			data.downloads = 0;
			for (const item of res.body.downloads) data.downloads += item.downloads;
			data.downloads = data.downloads.toLocaleString();
		});
		request.get('https://api.github.com/repos/dirigeants/klasa').end((err, res) => {
			if (!err) data.stars = res.body.stargazers_count.toLocaleString();
		});
		request.get('https://api.github.com/repos/dirigeants/klasa/stats/contributors').end((err, res) => {
			if (!err) data.contributors = res.body.length.toLocaleString();
		});


		return data;
	}
};
</script>
