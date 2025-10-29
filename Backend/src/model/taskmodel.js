const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
       type:String,
       require: true
    },
    content:{
        type: String,
    },
   
    status:{
        type:String,
        enum:["in-progress","pending","completed"],
        default:"pending"
    },
 
   
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true

    }
    
});

const invoiceModel = mongoose.model('task',taskSchema)

module.exports =  invoiceModel;