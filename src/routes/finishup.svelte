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
    async function getPoRes(verifyToken){
        apollo.mutate({
            mutation:CALCULATE_POINTS,
            context:{
                headers:{
                    'google_rec_token':verifyToken,
                    'authorization':`Bearer ${$session.token}`
                }
            }
        }).then(({data})=>{
            console.log(data);
        }).catch(e=>{
            window.location.href = '/'
        })
    }
</script>
<div class="text-center info-text">
    <h1 style="direction:rtl" class="text-4xl">{info}</h1>
</div>