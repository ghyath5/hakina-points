<script>
	let link
	let infoMsg = ''
	let btnText = 'تحقق'
	import { stores, goto } from '@sapper/app';
	import {onMount} from 'svelte'
	const { session } = stores();
	let prevent = false
	function submit(){
		if(prevent) return;
		prevent = true
		if(/https?:\/\/(t(elegram)?\.me|telegram\.org)\/([a-zA-Z0-9\_]{5,32})$\/?/.test(link) || /https?:\/\/(t(elegram)?\.me|telegram\.org)\/g_7akina_bot\?start=([0-9]*)/.test(link)){
            return grecaptcha.execute('6LdEDyYaAAAAAAgRMYwA01ImK8hN5gGi9au6KTgB', {action: 'auth'}).then(function(token) {
				if(token){
					window.serverCall('/settoken',{token}).then((res)=>res.json()).then(data=>{
						authorize()
						$session.googleToken = token
					})
				}else{
					window.location.reload()
				}
			});
		}
		infoMsg = 'تحقق من الرابط المدرج'
	}
	// onMount(()=>{
	// 	window.onSubmit = async function(token) {
			
	// 	};
	// 	console.log(grecaptcha.getResponse());
	// 	// window.onloadCallback = function() {
	// 		// grecaptcha.render('submit', {
	// 		// 	'sitekey' : '6LdEDyYaAAAAAAgRMYwA01ImK8hN5gGi9au6KTgB',
	// 		// 	'callback' : onSubmit
	// 		// });
	// 	// };
	// })
	const authorize = async ()=>{
		btnText = 'جار التحقق ...'
		infoMsg = ''
        try {
			let response = await window.serverCall('/autho/auth',{link})
			let data = await response.json()
			prevent = false
			btnText = 'تحقق'
            if(!data.state){
				infoMsg = data.message ? data.message:'حدث خطأ الرجاء مراسلة المطور'
				return;
            }
			$session.token = data.accessToken
			$session.step = 1
			goto('/steps/1')
        } catch (error) {
			prevent = false
			btnText = 'تحقق'
            infoMsg = 'حدث خطأ الرجاء مراسلة المطور'
        }
	}
	let waitFor = ''
	let can_rewarded = false
	onMount(()=>{
		let time = localStorage.getItem('time')
		if(!time){
			return can_rewarded = true
		}
		let timer = setInterval(()=>{
			let overallActivity = moment.duration(moment(time, 'YYYY-MM-DD HH:mm:ss.SS Z').diff(moment(new Date().toISOString(), 'YYYY-MM-DD HH:mm:ss.SS Z')))
			if(overallActivity.minutes()<=0 && overallActivity.seconds()<=0){
				clearInterval(timer)
				return can_rewarded = true
			}
			can_rewarded = false
			waitFor = `${overallActivity.minutes()}:${overallActivity.seconds()<=9?'0'+overallActivity.seconds():overallActivity.seconds()}`
		},1000)
	})
</script>
<svelte:head>
	<title>حاكينا - نقاط</title>
</svelte:head>
<div class="text-center">
	{#if !can_rewarded}
	<h3 class="text-2xl info-text mb-3" style="direction:rtl">الجائزة التالية بعد:</h3>
	<p class="text-6xl ">{waitFor}</p>
	{:else}
	<p class="text-red-500 info-text mb-2">{infoMsg}</p>
	<input type="text"
	placeholder="رابط الدعوة الخاص بك"
	bind:value={link}
	class=" text-center border-solid border-2 min-w-full focus:outline-none focus:ring focus:border-blue-800 h-16" />
	<p class="mb-2 text-gray-500 text-sm">:مثال <br/>https://t.me/g_7akina_bot?start=566571423 </p>
	<button on:click={submit} class="focus:outline-none focus:ring text-white uppercase px-8 py-2 rounded bg-blue-600 text-blue-50 max-w-max shadow-sm hover:shadow-lg">{btnText}</button>
	
	{/if}
</div>
