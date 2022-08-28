import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up',(req,res) =>{
    users.push(req.body)
    res.send("OK")
    console.log(users)
});

app.post('/tweets', (req,res) => {
    tweets.post(req.body)
    res.send("OK")
    console.log(tweets)
})

app.listen(5000);