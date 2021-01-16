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
                variables:{
                    limit:1,
                    offset:(params.step-1)
                },
                fetchPolicy:'network-only',
                context:{
                    headers:{
                        'google_rec_token':session.verifyToken,
                        'authorization':`Bearer ${session.token}`
                    }
                }
            })
            ads = data
        }catch(e){
            return this.redirect(302, '/');
        }
        if(!ads.ads_aggregate.aggregate.count){
            return this.redirect(302, '/');
        }
        return {
            ads:ads.ads,
            count:ads.ads_aggregate.aggregate.count,
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
    export let step,progressStep,ads,count;
    let waitSeconds = 8
    let steps = count>=5?count:5
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
        ad = ads[0] || ad
        if(process.browser){
            let playerContainer = document.getElementById('youtube')
            if(!playerContainer)return;
            playerContainer.innerHTML = '<div id="player" class="text-center m-auto"></div>'
        }
        if(steps <= step){
            return goto('/finishup')
        }
        waitSeconds = ad.duration
        info = ad.log
        runInterval()        
        runyoutubeApi()
        loadAd = false
    }
    let progress = 100
    onMount(()=>{
        runInterval()
    })
    let showNext = false
    let loading = false
    let processLoading = true
    if(ad.type == 'youtube'){
        processLoading = false
    }
    const runInterval = ()=>{
        clearInterval(interval)
        interval = setInterval(()=>{
            if(!processLoading)return;
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
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    const runyoutubeApi = ()=>{
        if(!process.browser || ad.type !='youtube')return;
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: ad.action_url,
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    }
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    let done = false;
    function onPlayerStateChange(event) {
        if(event.data != 1){
            processLoading = false
        }else{
            processLoading = true
        }
        // if (event.data == YT.PlayerState.PLAYING && !done) {
        //     setTimeout(stopVideo, 6000);
        //     done = true;
        // }
    }
    function stopVideo() {
        player.stopVideo();
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
    <!-- {#if ad.type == 'youtube'} -->
    <div id="youtube">
        <div id="player" class="text-center m-auto"></div>
    </div>
    <!-- {/if} -->
    <p class="info-text mb-5 text-2xl">{ad.description}</p>
    {#if ad.action_url && ad.action_text}
    <a target="_blank" href={ad.action_url} class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-indigo-800 info-text">{ad.action_text}</a>
    {/if}
</div>
{/if}