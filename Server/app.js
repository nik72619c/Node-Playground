const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const bodyParser=require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.post('/api/login', (request,response)=>{
    console.log('inside the login API');
    let user={
        name:"nikhil sharma",
        email:"nikhil@gmail.com",
        gender:"male",
        password:"some password"
    }

    //create or sign a token here
    let token=jwt.sign(user,'secretkey',{expiresIn: '300s'});
response.json({
    token
});
   
});

app.post('/api/goSomewhere',verifyToken,(request,response)=>{
    response.json({
        message:'visited successfully'
    })
})

function verifyToken(request,response,next){
    let authHeader=request.headers['authorization'];
    if(typeof authHeader!='undefined'){

        let bearer=authHeader.split(' ');
        console.log('bearer', bearer);
        let token=bearer[1];

        console.log('token', token);
        request.token=token;
        jwt.verify(request.token,'secretkey',(err,authData)=>{
            console.log('authData', authData);
            if(err){
                response.sendStatus(403);
            }
            else{
                request.authData=authData;
                next();
            }
        })
    }

   else {

    response.sendStatus(403);
    }
}

app.listen(5000,()=>{
    console.log('server successfully started on port 5000');
});