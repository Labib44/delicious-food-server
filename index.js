const express=require('express');
const cors= require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port=process.env.PORT || 5000;

const app= express();

// middlware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r6wv8dh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const foodMenuCollection=client.db('DeliciousFood').collection('Menu');


        app.get('/Menu',async(req, res)=>{
            const qeery={};
            const limit = 3;
            const foodMenu=await foodMenuCollection.find(qeery).limit(limit).toArray();
            res.send(foodMenu);
        })
        app.get('/moreMenu',async(req, res)=>{
            const qeery={};
            const foodMenu=await foodMenuCollection.find(qeery).toArray();
            res.send(foodMenu);
        })

    }
    finally{

    }
}
run().catch(console.log);


app.get('/', async(req, res)=>{
    res.send('Delicious server is running')
})

app.listen(port, ()=> console.log(`Delicious Food running on ${port}`));