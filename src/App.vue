<template>
	<div :class="`${dark ? 'dark' : 'light'} site`">
		<app-navbar />
		<router-view class="site-content" />
		<app-footer />
	</div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
	name: 'App',
	components: {
		AppNavbar,
		AppFooter
	},
	data() {
		return {
			dark: JSON.parse(localStorage.getItem('dark'))
		};
	},
	methods: {
		invite() {
			const popup = window.open('about:blank', '', 'toolbar=no,scrollbars=yes,resizable=yes,width=498,height=666');
			fetch('https://api.klasa.me/invite')
				.then(res => res.json())
				.then(({ invite }) => { popup.location = invite; });
		}
	}
};
</script>

<style lang="scss">

	// light Theme

	.light {
		$light:  hsl(217, 86%, 90%);
		$orange:  hsl(14, 100%, 47%);
		// Import Bulma's core
		@import "~bulma/sass/utilities/_all";

		$menu-item-active-background-color: $info;
		$menu-item-hover-background-color: $light;
		$footer-background-color: $light;

		// Import Bulma and Buefy styles
		@import "~bulma";
		@import "~buefy/src/scss/buefy";
		@import "./style";

		.is-patreon {
			color: $white-ter;
			background-color: $orange;
		}
	}

	// Dark Theme

	.dark {
		background-color: hsl(217, 8%, 10%);
		color: hsl(0, 0%, 52%);

		$light:  hsl(217, 20%, 18%);

		$black:  hsl(0, 0%, 96%);
		$black-bis:  hsl(0, 0%, 93%);
		$black-ter:  hsl(0, 0%, 86%);
		$grey-darker:  hsl(0, 0%, 83%);
		$grey-dark:  hsl(0, 0%, 80%);
		$grey:  hsl(0, 0%, 52%);
		$grey-light:  hsl(0, 0%, 29%);
		$grey-lighter:  hsl(0, 0%, 14%);
		$white-ter:  hsl(217, 8%, 10%);
		$white-bis:  hsl(217, 8%, 8%);
		$white:  hsl(217, 8%, 6%);
		$orange:  hsl(14, 100%, 47%);
		$yellow:  hsl(48, 100%, 33%);
		$green:  hsl(141, 71%, 40%);
		$turquoise:  hsl(171, 100%, 35%);
		$cyan:  hsl(204, 86%, 45%);
		$blue:  hsl(217, 71%, 49%);
		$purple:  hsl(271, 100%, 29%);
		$red:  hsl(348, 100%, 39%);

		// Import Bulma's core
		@import "~bulma/sass/utilities/_all";

		$menu-item-active-background-color: $info;
		$menu-item-hover-background-color: $light;
		$footer-background-color: $light;

		// Import Bulma and Buefy styles
		@import "~bulma";
		@import "~buefy/src/scss/buefy";
		@import "./style";

		.is-patreon {
			color: $black-ter;
			background-color: $orange;
		}
	}

	// base stuff

	@import "~bulma";
	@import "~buefy/src/scss/buefy";
</style>
