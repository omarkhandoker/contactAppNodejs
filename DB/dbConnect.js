import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({path : './config/.env'})

const mongoConnect = () => {
  mongoose.connect(process.env.MONGO_URL , {
    dbName : 'userConnect'
  }).then(()=> console.log("mongoose Connect")).catch((err)=>console.log(err))
}


export default mongoConnect;