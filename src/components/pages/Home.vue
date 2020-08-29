<template>
	<div class="container">
		<section class="section has-text-centered">
			<img class="logo" src="static/klasa.svg">
			<br>
			<br>
			<div class="unmaintainedBanner has-text-left">
				<h2 class="title is-3 paddingTop has-text-centered">
					<strong>
						Klasa has been discontinued
					</strong>
				</h2>
				<p class="paddingBottom has-text-centered">
					Due to many unprecedented events within the Dirigeants community, Klasa and related projects have now been discontinued and archived.
				</p>
				<p class="paddingBottom has-text-centered">
					We would like to thank everyone for using, supporting and contributing to the project.
					<span class="icon">
						<i class="fas fa-heart redHeart" />
					</span>
				</p>
			</div>
			<div class="tile is-ancestor">
				<div class="tile is-parent">
					<article class="tile is-child box content">
						<h5><strong>Install Stable</strong></h5>
						<pre v-highlightjs><code class="bash">npm install klasa</code></pre>
					</article>
				</div>
			</div>
			<div class="tile is-ancestor">
				<div class="tile is-parent">
					<article class="tile is-child box content has-text-left">
						<h5><strong>About:</strong></h5>
						<p>
							Klasa is an OOP discord.js bot framework which aims to be the most feature complete,
							while feeling like a consistent extension of <a href="https://discord.js.org/#/">
								discord.js
							</a>.
						</p>
						<p>
							Originally based on Komada, Klasa has become a <a href="https://en.wikipedia.org/wiki/Ship_of_Theseus">
								ship of Theseus
							</a> and so much more.
							You can only vaguely see similarities between the two frameworks anymore...
						</p>
					</article>
				</div>
				<div class="tile is-parent">
					<article class="tile is-child box content has-text-left">
						<h5><strong>Key Features:</strong></h5>
						<ul>
							<li>OOP and completely hot-reloadable (all commands, events, inhibitors, etc).</li>
							<li>Works with any database.</li>
							<li>Powerful and easy to configure permission levels system.</li>
							<li>Per Client/Guild/User settings, and possible to add more.</li>
							<li>Powerful command handler with: prompting, edits, argument resolving, flags, infinite args, custom args, and so much more...</li>
							<li>Fully customizable.</li>
						</ul>
					</article>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default { name: 'Home' };
</script>

<style lang="scss">
.unmaintainedBanner {
	margin-top: 2vh;
	margin-bottom: 2vh;
	padding-left: 16px;
	border-left: 8px orange solid;
	border-radius: 6px;
	background: rgba($color: #FBCB04, $alpha: 0.15);
	padding-left: 1rem;
	padding-right: 1rem;
}

.paddingTop {
	padding-top: 0.5rem !important;
}

.paddingBottom {
	padding-bottom: 0.5rem !important;
}

.redHeart {
	color: red;
}
</style>
