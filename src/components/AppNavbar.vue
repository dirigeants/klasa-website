<template>
	<div class="notification is-info is-marginless is-radiusless is-paddingless">
		<div class="container">
			<nav class="level is-mobile">
				<!-- Left side -->
				<div class="level-left">
					<div class="level-item">
						<router-link class="navbar-item button is-info title is-5 is-marginless activeTransparent" to="/">
							<img src="static/klasa_icon.svg" alt="Klasa">&nbsp;Klasa
						</router-link>
					</div>
				</div>

				<!-- Right side -->
				<div class="level-right">
					<div class="level-item">
						<router-link class="navbar-item button is-info is-5 is-marginless activeTransparent" to="/docs">
							<span class="icon">
								<b-icon icon="book" />
							</span>
							<span class="is-hidden-mobile">
								Docs
							</span>
						</router-link>
					</div>
					<div class="level-item">
						<a :href="`https://github.com/dirigeants/${this.$route.params.source || 'klasa'}/tree/${this.$route.params.tag || 'master'}`"
							class="navbar-item button is-info is-5 is-marginless activeTransparent"
						>
							<span class="icon">
								<i class="fab fa-github" />
							</span>
							<span class="is-hidden-mobile">
								Github
							</span>
						</a>
					</div>
				</div>
			</nav>
		</div>
	</div>
</template>


<style lang="scss">
.activeTransparent:focus, .activeTransparent:focus-within {
	background-color: transparent !important;
	box-shadow: none !important;
}
</style>
