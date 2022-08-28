import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

function last10(arr){
    const last = [];
    let size = arr.length - 1;
    let limit = -1;
    if(size > 9){
        limit = size - 10;
    }
    for(let i=size; i > limit ; i--){
        last.push(arr[i]);
    }
    return last;
}

app.post('/sign-up',(req,res) =>{
    if(!req.body.username || !req.body.avatar){
        res.status(400).send("Todos os campos são obrigatórios!")
        return;
    }
    users.push(req.body);
    res.status(201).send("OK");
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
    res.status(201).send("OK");
});

app.get('/tweets', (req,res) => {
    res.send(last10(tweets));
});

app.get('/tweets/:USERNAME',(req,res) => {
    const filteredtweets = tweets.filter(obj => obj.username === req.params.USERNAME);
    res.send(last10(filteredtweets));
});

app.listen(5000);