import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("") 
const[islogin,setIslogin]=useState(true)
const [message, setMessage] = useState("");
const navigate = useNavigate();



//register function
const handleRegister= async(e)=>{
  e.preventDefault()
  const res= await fetch("http://localhost:3000/auth/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials: "include",
    body:JSON.stringify({
      name,
      email,
      password
    })
  })
  const data= await res.json()
  console.log(data);
  
  if(res.ok){
  localStorage.setItem("token",data.token)
  localStorage.setItem("adminId", data.admin._id);
  localStorage.setItem("admin",JSON.stringify(data.admin))
  setEmail("")
  setName("")
  setPassword("")
  navigate('/dashboard')
  }
  else{
    setMessage( data.message);
  }
}


//login function

const handleLogin= async(e)=>{
  e.preventDefault()
  const res= await fetch("http://localhost:3000/auth/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      password
    })
  })
  const data= await res.json()
   if (!res.ok) {
    setMessage(data.message);
    return; 
  }
  localStorage.setItem("token",data.token)
  localStorage.setItem("adminId", data.admin._id);
  localStorage.setItem("admin",JSON.stringify(data.admin))
  console.log(data);
    setName(""),
    setPassword(""),
    setEmail("")
    navigate('/dashboard')
} 

  return (
    < >
    <div className='   border-2 border-black bg-[#010101]  w-full h-screen flex flex-col justify-center items-center gap-6 '>
<h1 className='relative bg-gradient-to-b md:text-3xl from-[#1B1B1B] via-white bg-clip-text text-transparent md:mb-10 inline-block text-center after:content-[""] after:block after:w-3/4 after:h-[2px] after:mx-auto after:mt-2 after:bg-gradient-to-r after:from-[#1B1B1B] after:via-white after:to-[#1B1B1B]'>
  Plan. Create. Achieve. All your tasks in one place
</h1>

  <form className='items-center bg-[#0F0F0F] border border-white/40 md:w-[25%] w-[80%] h-[60%] md:h-[65%] flex flex-col text-amber-50 justify-center rounded-3xl shadow-lg shadow-amber-200/10 hover:shadow-amber-200/20 transition-all duration-300'
 onSubmit={islogin ? handleLogin : handleRegister}>

    <div className='md:mb-4'>
 <h6 className='font-urbanist text-left ml-4  w-1/2'>Name</h6>
      <input type="text " className='bg-[#0F0F0F] p-2 border m-2 my-2 rounded-full' placeholder=' Enter the name' value={name} onChange={(e) => setName(e.target.value)} />
    </div>
      
      <div className='md:mb-4'>
     <h6 className='font-urbanist text-left ml-4 w-1/2'>Email</h6>
      <input type="email" className='bg-[#0F0F0F] p-2 border my-2 m-2 rounded-full' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)} />

          </div>
     
<div>
      <h6 className='font-urbanist text-left ml-4  w-1/2'>Password</h6>
      <input type="password" className='bg-[#0F0F0F]  p-2 border m-2 rounded-full    ' placeholder='Enter the password' value={password} onChange={(e) => setPassword(e.target.value)} />
</div>

      <button type="submit" className='bg-black py-1 px-6 top-4 my-6 md:rounded-full  rounded-3xl  border-amber-50 border-b-2  border-r-2 hover:bg-[#6F6F6F]'>submit</button>
      <p onClick={() => setIslogin(!islogin)}>{islogin ? "Don't have an account? Register" : "Already have an account? Login"}</p>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </form>
    </div>
  
    </>
    
  )
}

export default Auth
