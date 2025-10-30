const AdminModel = require('../model/authmodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// register admin 
//check if admin name presnet before 
//if not then create one 



async function register(req,res) {
    const {name,email,password} = req.body;
    const admin = await AdminModel.findOne({name});
    if(admin){
      return res.status(400).json({
        message:"admin already registered"
      })
    }
    //no admin found 

    //hash pasword 
    const hashpasword = await bcrypt.hash(password,10)
    const createAdmin = await AdminModel.create({
        name,
        email,
        password:hashpasword
    })  

    const token = jwt.sign({id:createAdmin._id, name:createAdmin.name},process.env.Jwt_Secret)

    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite: "none",
        maxAge:1000*60*60*24
    })

    return res.status(200).json({
        message:"Admin registered",
        token,
        admin: createAdmin

    })
    //authinticating the admin                                                   
}  


//login 

async function login(req,res) {
    const {name,password} = req.body;
    const admin = await AdminModel.findOne({name})
    if (!admin){
        return res.status(400).json({
            message:'admin not found!'
        })
    }
 const ispassword = await bcrypt.compare(password, admin.password)

    if(!ispassword ){
        return res.status(400).json({
            message:'password in correct'

        })
    }
    
    const token = jwt.sign(
        {id:admin.id,name:admin.name},process.env.Jwt_Secret
    
    )
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:"none",
        secure:true,
        maxAge: 24 * 60 * 60 * 1000, 

    });

    return res.status(201).json({
        message:"user login in succesfully",
        token,
        admin,
    })
    
}

//logout function
async function logout(req,res) {
    res.clearCookie('token',{   
        httpOnly:true,
        sameSite:"none",
        secure:true,
    });
    return res.status(200).json({
        message:"user logged out successfully"
    });
}

module.exports = {register,login,logout}