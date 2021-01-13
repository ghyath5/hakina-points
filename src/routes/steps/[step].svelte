<svelte:head>
	<title>حاكينا - نقاط</title>
</svelte:head>
<script context="module">
    import { apollo } from "../../apollo"
    import ADS  from '../../../gql/ads.gql'
	export async function preload({params}, session) {
		if(!session.googleToken || !session.token || !params.step){
            return this.redirect(302, '/');
        }
        if(session.step && (Number(session.step)+1)<Number(params.step)){
            return this.redirect(302,`steps/${(session.step)}`)
        }
        let ads
        try{
            let {data} = await apollo.query({
                query:ADS,
                fetchPolicy:'network-only',
                context:{
                    headers:{
                        'google_rec_token':session.verifyToken,
                        'authorization':`Bearer ${session.token}`
                    }
                }
            })
            ads = data.ads
        }catch(e){
            return this.redirect(302, '/');
        }
        if(!ads.length){
            return this.redirect(302, '/');
        }
        return {
            ads,
            step:params.step,
            progressStep:100
        }
	}
</script>
<script>
    import { stores, goto } from '@sapper/app';
    import { slide } from 'svelte/transition';
	import {onMount} from 'svelte'
	const { session  } = stores();
    let info = 'جار التحقق ...'
    export let step,progressStep,ads;
    let waitSeconds = 8
    let steps = ads.length>=5?ads.length:5
    let interval
    $: checkAd(step)
    let loadAd = false
    let ad = {
        title:"للمزيد من المعلومات",
        description:"تابع حسابي على انستاغرام",
        action_url:"https://www.instagram.com/ghyathdarwish/",
        duration:6,
        action_text:'متابعة',
        log:'جار معالجة البيانات'
    }
    function checkAd(step){
        ad = ads.find((a)=>a.id==step) || ad
        if(steps <= step){
            return goto('/finishup')
        }
        waitSeconds = ad.duration
        info = ad.log
        runInterval()
        loadAd = false
    }
    let progress = 100
    onMount(()=>{
        runInterval()
    })
    let showNext = false
    let loading = false
    const runInterval = ()=>{
        clearInterval(interval)
        interval = setInterval(()=>{
            let step = (100/waitSeconds)*0.005
            progressStep-=step
            progress =  progressStep
            if(progressStep<= 0){
                clearInterval(interval)
                finProg()
            }
        },5)
    }
    const finProg = ()=>{
        if(!process.browser)return;
        loading = true
        return grecaptcha.execute('6LdEDyYaAAAAAAgRMYwA01ImK8hN5gGi9au6KTgB', {action: `step${step}`}).then(function(token) {
            if(token){
                window.serverCall('/settoken',{token}).then((res)=>res.json()).then(()=>{
                    $session.googleToken = token
                    window.serverCall('/steps/nextStep',{step}).then(res=>res.json()).then(data=>{
                        loading = false
                        if(data.status == 'success'){
                            showNext = true
                            $session.step = step
                            $session.token = data.accessToken
                            info = 'إضغط على التالي'
                        }else{
                            return goto('/')
                        }
                    })
                })
            }else{
                window.location.href = '/'
            }
        });
    }
    function nextSlide(){
        if(progress>0){
            return;
        }
        showNext = false
        loadAd = true
        goto(`/steps/${Number($session.step)+1}`)
    }
</script>
<div class="relative p-0">
    <p class="text-center info-text mb-2" style="direction:rtl">
        {info} <span>{steps-1}/{step}</span>
    </p>
    <div class="overflow-hidden h-2 mb-1 text-xs flex rounded bg-pink-200">
      <div style="width: {progress}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
    </div>
</div>
{#if loading}
<p class="text-center">الرجاء الإنتظار ...</p>
{/if}
{#if showNext}
<button on:click={nextSlide} class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 info-text">التالي</button>
{/if}

{#if !loadAd}
<div transition:slide|local class="mt-8 text-center border-black border p-3">
    <h1 class="info-text text-gray-600 mb-3 text-3xl">{ad.title}</h1>
    <p class="info-text mb-5 text-2xl">{ad.description}</p>
    <a target="_blank" href={ad.action_url} class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-indigo-800 info-text">{ad.action_text}</a>
</div>
{/if}