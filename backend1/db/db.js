const mongoose = require('mongoose')

const connect = async ()=>{
   try{
   await mongoose.connect(process.env.Mongo_Url);
   console.log('connected to db')
   

   }catch(err){
    console.error('didtn connect')
   }
}

module.exports = connect

