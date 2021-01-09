<script>
	import Nav from '../components/Nav.svelte';
	import GlobalStyle from "../components/GlobalStyle.svelte";
	import {onMount} from 'svelte'
	export let segment;
	
	onMount(()=>{
		window.serverCall = async function (path,data){
			const response = await fetch(path, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data),
			});
			return response
		}
	})
</script>

<style>
	
	:global().info-text{
		font-family: 'Cairo';
	}
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<GlobalStyle />
	<slot></slot>
</main>