<template>
	<div class="site">
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
	}
};
</script>

<style lang="scss">

	$light: #c1d5e0;

	// Import Bulma's core
	@import "~bulma/sass/utilities/_all";

	$menu-item-active-background-color: $info;
	$menu-item-hover-background-color: $light;
	$footer-background-color: $light;

	// Import Bulma and Buefy styles
	@import "~bulma";
	@import "~buefy/src/scss/buefy";

	// Flexbox display
	@mixin flexbox() {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
	}

	.site {
		@include flexbox;
		min-height: 100vh;
		flex-direction: column;
	}

	.logo {
		width: 100%;
		max-width: 400px;
	}

	.site-content {
		flex: 1;
	}

	.footer {
		padding: 1.5rem 1.5rem 1.5rem;
	}

	.docs-nav {
		padding: 1rem;
	}

	.level-left {
		.has-text-left {
			justify-content: left;
		}
	}

	.card-footer-item {
		justify-content: left;
	}

	pre {
		padding: 0px !important;
	}

	.hljs {
		border-radius: $radius-large;
		padding: 1em !important;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	.fade-resize-enter-active, .fade-resize-leave-active {
		transition: opacity 0.3s, transform 0.3s;
		transform-origin: top;
	}
	.fade-resize-enter, .fade-resize-leave-to {
		opacity: 0;
		transform: scale(0.95);
	}

	.fade-slide-enter-active, .fade-slide-leave-active {
		transition: opacity 0.15s, transform 0.15s;
	}
	.fade-slide-enter, .fade-slide-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}

	.animated-list-item {
		transition: all 0.3s;
	}
	.animated-list-enter, .animated-list-leave-to {
		opacity: 0;
		transform: scale(0.4);
	}
	.animated-list-leave-active {
		position: absolute;

		.tag {
			display: none;
		}
	}

</style>
