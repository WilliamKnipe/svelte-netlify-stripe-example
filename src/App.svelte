<script lang="ts">
  import { Router, Route } from "svelte-navigator";
	import Home from "./routes/Home.svelte";
	import Story from "./routes/Story.svelte";
	import Bag from "./routes/Bag.svelte";
	import Success from "./routes/Success.svelte";
	import Footer from "./components/Footer.svelte";
	import Header from "./components/Header.svelte";
</script>


<Router>
	<Header />
	<main>
		<Route path="/">
			<Home />
		</Route>
		<Route path="about" component={Story} />
		<Route path="bag" component={Bag} />
		<Route path="success" component={Success} />
	</main>
	<Footer />
</Router>


<style>
	main {
	    padding: 16px;
		min-height: calc(100vh - 100px);
		max-width: min(100vw, 1100px);
		margin: auto;
		left: 0;
		right: 0;
	}
</style>