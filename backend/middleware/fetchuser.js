var jwt = require('jsonwebtoken');
const jwt_secret="Fuck$you"// this should most probably have been in env.local
// next is for calling  the function after fetchuser 
const fetchuser=(req,res,next)=>{
    //get user from the jwt authtoken and add id to req subject
    const token=req.header('authtokenjwt')
    if(!token)
        {
            res.status(401).send({error:'acces denied authenticate using a valid token '})
        }
        try{

            const data=jwt.verify(token,jwt_secret)// whether the token and its jwtstring matches
            req.user=data.user;
        }catch(error){
            res.status(401).send({error:'acces denied authenticate using a valid token '})
        }
    next()
}
module.exports=fetchuser
