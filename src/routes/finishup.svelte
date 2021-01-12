<svelte:head>
	<title>حاكينا - نقاط</title>
</svelte:head>
<script context="module">
	export async function preload({params}, session) {
		if(!session.googleToken || !session.token){
            return this.redirect(302, '/');
        }
	}
</script>
<script>
    import { stores, goto } from '@sapper/app';
	import {onMount} from 'svelte'
    const { session  } = stores();
    import { apollo } from "../apollo"
    import CALCULATE_POINTS  from '../../gql/finishup.gql'
    let info = 'جار إحتساب النقاط ...'
    onMount(()=>{
        grecaptcha.execute('6LdEDyYaAAAAAAgRMYwA01ImK8hN5gGi9au6KTgB', {action: 'finishup'}).then(function(token) {
            if(token){
                getPoRes(token)
            }else{
                window.location.href = '/'
            }
        })
    })
    let loading = true
    
    
    async function getPoRes(verifyToken){
        let winer = new Audio("win.mp3")
        apollo.mutate({
            mutation:CALCULATE_POINTS,
            context:{
                headers:{
                    'google_rec_token':verifyToken,
                    'authorization':`Bearer ${$session.token}`
                }
            }
        }).then(({data})=>{
            loading = false
            if(data.calculate_web_points && data.calculate_web_points.message){
                let time = new Date()
                time.setMinutes(time.getMinutes()+6)
                status = true
                info = data.calculate_web_points.message
                localStorage.setItem('time',time.toISOString())
                winer.play()
            }
        }).catch(e=>{
            console.log(e);
            // window.location.href = '/'
        })
    }
    function gotoHome(){
        window.location.href = '/'
    }
</script>
<div class="text-center info-text">
    <h1 style="direction:rtl" class="text-4xl mb-2">{info}</h1>
    {#if !loading}
    <button on:click={gotoHome} class="focus:outline-none focus:ring text-white uppercase px-8 py-2 rounded bg-blue-600 text-blue-50 max-w-max shadow-sm hover:shadow-lg">موافق</button>
    {/if}
</div>