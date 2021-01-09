export async function post(req, res) {
    let token = req.body.token
    if(!token){
        throw new Error("Err");
    }
    req.session.googleToken = token
    return res.end(JSON.stringify({ token }));
}