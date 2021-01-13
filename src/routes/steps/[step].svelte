<svelte:head>
	<title>حاكينا - نقاط</title>
</svelte:head>
<script context="module">
	export async function preload({params}, session) {
		if(!session.googleToken || !session.token || !params.step){
            return this.redirect(302, '/');
        }
        if(session.step && (Number(session.step)+1)<Number(params.step)){
            return this.redirect(302,`steps/${(session.step)}`)
        }
        return {
            step:params.step,
            progressStep:100
        }
	}
</script>
<script>
    import { stores, goto } from '@sapper/app';
	import {onMount} from 'svelte'
	const { session  } = stores();
    let info = 'جار التحقق ...'
    export let step,progressStep; 
    $: switch(Number(step)){
        case 1 : info = 'جار التحقق من المعلومات';
        break;
        case 2: info = 'جار تجهيز النقاط ...';
        break;
        case 3 : info = 'جار التحقق من حسابك ...';
        break;
        case 4 : info = 'جار إحتساب البيانات ...';
        break;
        case 5 : info = 'جار العمل على توليد النقاط ...';
        break;
        default: goto('/finishup')
    }
    let progress = 100
    onMount(()=>{
        runInterval()
    })
    let showNext = false
    let loading = false
    const runInterval = ()=>{
        let interval = setInterval(()=>{
            let step = (100/6)*0.005
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
        goto(`/steps/${Number($session.step)+1}`)
        runInterval()
    }
</script>
<div class="relative p-0">
    <p class="text-center info-text mb-2" style="direction:rtl">{info}</p>
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