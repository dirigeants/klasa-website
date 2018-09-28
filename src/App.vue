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
	},
	data() {
		const darkMode = localStorage.getItem('dark');
		return {
			dark: darkMode !== 'false' && darkMode !== null
		}
	},
	mounted() {
		if (this.dark) this.$el.classList.add('dark');
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

	$light: #c1d5e0;

	// Import Bulma's core
	@import "~bulma/sass/utilities/_all";

	$menu-item-active-background-color: $info;
	$menu-item-hover-background-color: $light;
	$footer-background-color: $light;

	// Import Bulma and Buefy styles
	@import "~bulma";
	@import "~buefy/src/scss/buefy";

	.site {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
	}

	* {
		transition-duration: 0.2s;
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

	// Dark Theme

	.dark {
		background-color: #212121;
		color: #E0E0E0;
	}

	.dark .card, .dark article {
		background-color: #2d2d2d;
		color: #E0E0E0;
    	border-radius: 5px;
	}

	.dark h5 strong,
	.dark h2,
	.dark h3,
	.dark h5,
	.dark h1,
	.dark:not(blockquote) strong {
		color: #E0E0E0;
	}

	.dark li {
		color: #E0E0E0;
		background-color: transparent;
	}

	.dark .is-pulled-right {
		background-color: #212121;
		border-radius: 100px;
		padding: 5px 9px;
		cursor: pointer;
	}

	.dark .is-pulled-right a {
		color: #E0E0E0;
	}

	.dark .nav {
		background-color: #01579B;
	}

	.dark footer {
		background-color: #263238;
	}

	.dark footer p {
		color: #CFD8DC;
	}

	.dark footer strong {
		color: #E0E0E0;
	}

	.dark .card {
		background-color: #2d2d2d;
		border-radius: 5px;
	}

	.dark .card-header {
		border-radius: 5px;
		color: #E0E0E0;
		background-color: #209cee;
	}

	.dark .card-header-title {
		color: #E0E0E0;
	}

	.dark .card-header-title a {
		color: #B3E5FC;
	}

	.dark .card-content strong {
		color: #CFD8DC;
	}

	.dark .card-footer-item strong {
		color: #CFD8DC;
	}

	.dark .menu-label {
		color: #E0E0E0;
	}

	.dark .menu-list a:hover {
		color: #2d2d2d;
	}

	.dark nav.animated-list-item fa {
		color: #CFD8DC;
	}

	.dark nav.tabs a {
		color: #78909C;
	}

	.dark nav.tabs a:hover {
		color: #B0BEC5;
	}

	.dark nav .is-active a span {
		color: #3273dc;
	}

	.dark .is-info {
		background-color: hsl(204, 74%, 48%)
	}

	.dark .is-pulled-right {
		background-color: #209cee;
	}
	
	.dark .is-pulled-right fa {
		color: #E0E0E0;
	}

	.dark .card-content p {
		color: #CFD8DC;
	}

	.dark .title {
		color: #E0E0E0;
	}

	.dark .animated-list-item a {
		color: #CFD8DC;
	}

	.dark th {
		background-color: #0288D1;
	}

	.dark .th-wrap {
		color: #E0E0E0;
	}

	.dark table {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.dark td .chevron-cell span {
		color: rgb(211, 211, 211);
		background-color: #2d2d2d;
	}

	.dark .box {
		border-radius: 5px;
		color: #E0E0E0;
		background-color: #2d2d2d;
	}

	.dark .box strong {
		color: #E0E0E0;
	}

	.dark .site-content .is-light {
		color: #E0E0E0;
		background-color: #455A64;
	}

	.dark blockquote {
		background-color: #CFD8DC;
		border-radius: 5px;
		color: #2d2d2d;
		border-color: rgb(112, 112, 112);
	}

	.dark blockquote strong,
	.dark blockquote li {
		color: #2d2d2d;
	}

	.dark td strong,
	.dark .card {
		color: #E0E0E0;
	}

	.dark .select select,
	.dark .input.is-light {
		background-color: #CFD8DC;
		color: #2d2d2d;
	}

	.dark pre {
		background-color: #2d2d2d;
	}

	.dark code {
		border-radius: 5px;
	}

	.dark table thead td,
	.dark table thead th {
		color: #E0E0E0;
	}

	.dark .content code:not(.hljs) {
		background-color: #B0BEC5;
    	color: #b71c1c;
	}

</style>
