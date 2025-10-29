const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    password:"string",
    email:"string"
})

const AdminModel = mongoose.model('admin',AdminSchema)

module.exports = AdminModel;