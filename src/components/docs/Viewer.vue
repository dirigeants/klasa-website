<template>
	<div class="container">
		<div class="columns is-gapless">
			<div :class="`column is-one-fifth ${visible ? '' : 'is-hidden-mobile'}`">
				<sidebar :docs="docs" @showPrivate="setShowPrivate" />
			</div>
			<div class="column is-four-fifths">
				<div :class="`button is-white ${visible ? 'is-hidden-mobile' : 'is-hidden-tablet'}`" @click="toggle">
					<b-icon icon="bars" />
				</div>
				<section class="section">
					<transition name="fade-slide" mode="out-in" appear>
						<router-view :key="key" :docs="docs" :show-private="showPrivate" />
					</transition>
				</section>
				<button id="scroll-top" class="button is-info is-rounded" title="Scroll to top" @click="scrollTop">
					<b-icon icon="arrow-up" />
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
	name: 'DocsViewer',
	components: { Sidebar },
	props: ['docs'],

	data() {
		return {
			visible: false,
			showPrivate: false
		};
	},

	computed: {
		key() {
			// eslint-disable-next-line prefer-destructuring
			const params = this.$route.params;
			if (params.file) return `${params.category}/${params.file}`;
			if (params.search) return 'search';
			return params.class || params.typedef;
		}
	},

	mounted() {
		this.$nextTick(() => {
			const scroller = document.getElementById('scroll-top');
			let hideTimeout;
			let showTimeout;

			const showListener = () => {
				if ((window.pageYOffset || document.documentElement.scrollTop) > 300) {
					clearTimeout(hideTimeout);
					clearTimeout(showTimeout);
					scroller.style.display = 'block';
					showTimeout = setTimeout(() => { scroller.style.opacity = '1'; }, 20);
					window.removeEventListener('scroll', showListener);
					window.addEventListener('scroll', hideListener);
				}
			};

			const hideListener = () => {
				if ((window.pageYOffset || document.documentElement.scrollTop) < 300) {
					clearTimeout(hideTimeout);
					clearTimeout(showTimeout);
					scroller.style.opacity = '0';
					hideTimeout = setTimeout(() => { scroller.style.display = 'none'; }, 1000);
					window.removeEventListener('scroll', hideListener);
					window.addEventListener('scroll', showListener);
				}
			};

			window.addEventListener('scroll', showListener);
		});
	},

	methods: {
		toggle() {
			this.visible = !this.visible;
		},
		setShowPrivate(show) {
			this.showPrivate = show;
		},

		scrollTop() {
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	}

};
</script>

<style lang="scss">
	#scroll-top {
		position: fixed;
		bottom: 20px;
		right: 20px;

		transition: opacity 0.5s, background 0.3s;
		display: none;
		opacity: 0;

		&:hover {
			background: lighten(#2196F3, 18%);
		}
	}
</style>
