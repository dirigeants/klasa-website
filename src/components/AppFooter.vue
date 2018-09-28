<template>
	<footer class="footer">
		<div class="container">
			<div class="content has-text-centered">
				<p>
					<strong>Let's stop reinventing the wheel, and start coding the bots of our dreams!</strong>
				</p>
				<div class="columns">
					<div class="column is-two-fifths is-hidden-tablet"/>
					<div class="column">
						<a class="button is-info" @click="invite()">
							<span>Have questions?</span>
							<span class="icon"><i class="fab fa-discord"/></span>
						</a>
					</div>
					<div class="column">
						<a href="https://www.npmjs.com/package/klasa" class="button is-info">
							<span>Published using:</span>
							<span class="icon"><i class="fab fa-npm"/></span>
						</a>
					</div>
					<div class="column">
						<a href="https://www.patreon.com/klasa" class="button is-info">
							<span>Support Klasa:</span>
							<span class="icon"><i class="fab fa-patreon"/></span>
						</a>
					</div>

					<div class="column is-two-fifths is-hidden-tablet"/>
				</div>
				<stats />

				<p>
					<a :class="color" @click="toggleDark()">
						<span class="icon" style="margin-right: 5px;"><i :class="icon"/></span>
						{{opposite}} Mode
					</a>
				</p>
			</div>
		</div>
	</footer>
</template>

<script>
import Stats from './Stats.vue';

export default {
	name: 'AppFooter',
	components: { Stats	},
	computed: {
		invite() {
			return this.$parent.invite;
		}
	},
	data() {
		const darkMode = localStorage.getItem('dark');
		return {
			dark: darkMode !== 'false' && darkMode !== null,
			opposite: darkMode !== 'false' && darkMode !== null ? "Light" : "Dark",
			icon: darkMode !== 'false' && darkMode !== null ? "fas fa-sun" : "fas fa-moon",
			color: darkMode !== 'false' && darkMode !== null ? "button is-light is-medium" : "button is-dark is-medium"
		}
	},
	methods: {
		toggleDark() {
			this.dark = !this.dark;
			localStorage.setItem('dark', this.dark);
			this.dark ? this.$parent.$el.classList.add('dark') : this.$parent.$el.classList.remove('dark');
			this.opposite = this.dark ? "Light" : "Dark";
			this.icon = this.dark ? "fas fa-sun" : "fas fa-moon";
			this.color = this.dark ? "button is-light is-medium" : "button is-dark is-medium";
		}
	}
};
</script>
