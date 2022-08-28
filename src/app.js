import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up',(req,res) =>{
    if(!req.body.username || !req.body.avatar){
        res.status(400).send("Todos os campos são obrigatórios!")
        return;
    }
    users.push(req.body);
    res.send("OK");
});

app.post('/tweets', (req,res) => {
    const obj = req.body;
    if(!obj.username || !obj.tweet){
        res.status(400).send("Todos os campos são obrigatórios!")
        return;
    }
    const url = users.find(usuario => usuario.username === obj.username).avatar;
    obj.avatar = url;
    tweets.push(obj);
    res.send("OK");
});

app.get('/tweets', (req,res) => {
    const last10 = [];
    let size = tweets.length - 1;
    let limit = -1;
    if(size > 9){
        limit = size - 10;
    }
    for(let i=size; i > limit ; i--){
        last10.push(tweets[i]);
    }
    res.send(last10)
});

app.listen(5000);