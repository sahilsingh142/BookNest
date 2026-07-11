import express from "express";
import auth from './Routes/userRoute.js'
import mongoose from "mongoose";

const app = express();
const url = 'mongodb+srv://Sahil:Sahil0998@booknest.qstoppn.mongodb.net/booknest?retryWrites=true&w=majority';

app.use(express.json());
app.use('/auth', auth);

app.get('/get',(req,res) =>{
    res.send('Hello backend')
})

mongoose.connect(url)
.then(()=>{
    console.log("Database Connected")
})
.catch((err) => {
    console.log(err);
})

app.listen(5600, () => {
    console.log("Server Connected")
});