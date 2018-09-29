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
					<a class="button is-dark" @click="toggleDark()">
						<span class="icon" style="margin-right: 5px;"><i :class="dark ? 'fas fa-sun' : 'fas fa-moon'"/></span>
						{{ dark ? "Light" : "Dark" }} Mode
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
		},
		dark() {
			return this.$parent.dark;
		}
	},
	methods: {
		toggleDark() {
			this.$parent.dark = !this.$parent.dark;
			localStorage.setItem('dark', String(this.$parent.dark));
			this.$parent.setTheme();
		}
	}
};
</script>
