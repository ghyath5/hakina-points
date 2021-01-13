<script>
	import Nav from '../components/Nav.svelte';
	import GlobalStyle from "../components/GlobalStyle.svelte";
	import {onMount} from 'svelte'
	
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
		// requestNotificationPermission()
	})
	// const requestNotificationPermission = async () => {
	// 	const permission = await window.Notification.requestPermission();
	// 	// value of permission can be 'granted', 'default', 'denied'
	// 	// granted: user has accepted the request
	// 	// default: user has dismissed the notification permission popup by clicking on x
	// 	// denied: user has denied the request.
	// 	if(permission !== 'granted'){
	// 		throw new Error('Permission not granted for Notification');
	// 	}
	// 	subscribe()
	// }
	// const subscribe = async ()=>{
	// 	const myWorker = new Worker('../service-worker.js')
	// 	myWorker.postMessage({
	// 		data: {data:"Tliserliae"}
	// 	});
	// }
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

<Nav />

<main>
	<GlobalStyle />
	<slot></slot>
</main>