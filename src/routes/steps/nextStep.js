import { apollo } from "../../apollo"
import VERIFY  from '../../../gql/verify.gql'
export async function post(req, res) {
    let step = req.body.step
    let session = req.session
    if(!session.googleToken || !session.token || !step){
        return res.status(400).json({
            message:'Error'
        })
    }
    return apollo.mutate({
        mutation:VERIFY,
        variables:{
            slide:step
        },
        context:{
            headers:{
                'google_rec_token':session.googleToken,
                'authorization':`Bearer ${session.token}`
            }
        }
    }).then(({data})=>{
        if(data.verify_slide.status == 'success'){
            req.session.step = step
            req.session.token = data.verify_slide.accessToken
        }
        return res.end(JSON.stringify(data.verify_slide));
    }).catch((e)=>{
        res.end(JSON.stringify(e));
    })
}