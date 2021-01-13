import { apollo } from "../../apollo"
import AUTH_MUTATION  from '../../../gql/auth.gql'
export async function post(req, res) {
    const {link} = req.body
    if(!req.session.googleToken){
        return res.status(401).send('Error')
    }
    return apollo.mutate({
        mutation:AUTH_MUTATION,
        variables:{
            data:{
                link
            }
        },
        context:{
            headers:{
                'google_rec_token':req.session.googleToken
            }
        }
    }).then(({data})=>{
        if(data.auth.state){
            req.session.token = data.auth.accessToken
            req.session.step = 1
        }
        return res.end(JSON.stringify(data.auth))
    })
    
}