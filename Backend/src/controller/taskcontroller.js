const taskModel = require('../model/taskmodel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose'); 

async function create(req,res) {

 try{
    const {name,amount,content,status} = req.body;
    const isexistemploy = await taskModel.findOne({name}) 
    if(isexistemploy){
      return res.status(400).json({
        message:"task already exist"
      })
    }
    // --- Core Logic: Get and Convert Admin ID ---
        // 1. Get the admin ID from the token (set by middleware)
        const adminIdFromToken = req.admin.id;

        // 2. Convert the string ID to a Mongoose ObjectId for proper linking
        const adminObjectId = new mongoose.Types.ObjectId(adminIdFromToken);
   // const hash = await bcrypt.hash(password,10)

    //hash password
    const task = await taskModel.create({
        name,
        content,
        amount,
        status,
        admin:adminObjectId 
    })

    return res.status(201).json({
        message:"task created succesfully",
        task
    })
   }
   catch(err){
      return res.status(400).json({
        message:(`error ${err}`)
      })
   }
}


//view all invoices

async function all(req,res){
  try{
        const allTasks = await taskModel.find()
    return res.status(200).json({
        message:'all tasks  fetched successfully',
        allTasks
      })
  } 
  catch(err){
    return res.status.json({
        message:(`error`,err)
    })
  }
   
}


//get invoices by admin id



async function getAdminInvoices(req, res) {
    try {
        const adminId = req.admin.id;
        
        // 1. Convert the string ID from the JWT payload to a Mongoose ObjectId
        const objectId = new mongoose.Types.ObjectId(adminId);

        // 2. FIX: Use 'admin' (the schema field) instead of 'invoices' 
        const tasks = await taskModel.find({ admin: objectId }); 

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                message: "No tasks found for your account."
            });
        }

        return res.status(200).json({
            message: "Tasks fetched successfully for the authenticated admin",
            tasks
        });

    } catch (err) {
        console.error("Error fetching admin tasks:", err);
        return res.status(500).json({
            message: "An internal server error occurred while fetching tasks."
        });
    }
}
// update tasks 

async function update(req,res){
 try{
  const {id} = req.params;
  const {name, status, content} = req.body;
  const updatedtask = await taskModel.findByIdAndUpdate({_id:id},
    {
      name,
      status,
      content,
    },{new:true})
    return res.status(200).json({
      message:"task updated successfully",
      updatedtask
    })
  }
  catch(err){
    return res.status(400).json({
      message:(`error ${err}`)
    })
  }
}

//delete invoice
async function deleteinvoice(req,res){
  try{
    const {id} = req.params;    
    const deletetask = await taskModel.findByIdAndDelete({_id:id})
    return res.status(200).json({
      message:"task deleted successfully",
      deletetask
    })
  }
  catch(err){
    return res.status(400).json({
      message:(`error ${err}`)
    })
  }
}



module.exports = {create,all,update,deleteinvoice, getAdminInvoices};