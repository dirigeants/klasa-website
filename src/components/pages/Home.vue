<template>
	<div class="container">
		<section class="section has-text-centered">
			<img class="logo" src="static/klasa.svg">
			<br>
			<br>
			<div class="unmaintainedBanner has-text-left">
				<h2 class="title is-3">
					<strong>
						Klasa is not maintained anymore; here's why:
					</strong>
				</h2>
				Due to the differences between us, the community, and one of the ex Core Developers,
				Dirigeants and all its projects are now unable to be maintained, as most of the active
				contributors and Core Developers were banned from the Discord server.
				<br>
				We recommend you look for another framework to use. You may still use Klasa as is,
				but you're doing so at your own risk, and <b>we wil not provide support or bugfixes</b>.
				<br>
				We'd like to thank everyone who contributed to our projects, and our community!
				It's sad to see this come to an end as it stands, however our hands are tied.
				<br>
				<br>
				If you wish to learn more about this incident, we invite you to read its writeup, as recorded by
				Favna, <a href="https://gist.github.com/Favna/b9b6c23b6e545f7eddfdb55027a182df"> found here</a>
			</div>
			<div class="tile is-ancestor">
				<article class="tile is-child box content is-not-feeling-so-good">
					<h5><strong>Install Stable</strong></h5>
					<pre v-highlightjs><code class="bash">npm install klasa</code></pre>
				</article>
				<div class="tile is-parent">
					<article class="tile is-child box content is-not-feeling-so-good">
						<h5><strong>Install Master</strong></h5>
						<pre v-highlightjs><code class="bash">npm install dirigeants/klasa#build</code></pre>
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
	background: rgba($color: #FBCB04, $alpha: 0.15)
}
</style>
