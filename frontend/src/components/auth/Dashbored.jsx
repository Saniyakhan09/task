import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
      const admin = JSON.parse(localStorage.getItem("admin"));
      const navigate = useNavigate();

      const hanglelogout = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          // credentials: "include",
        });

        if (res.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("admin");
          navigate("/");
        }
      };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-x-hidden">
      {/* Header */}
      <div className="p-6 sticky top-0 bg-black/40 backdrop-blur-lg z-50 flex justify-between items-center">
        <h1 className="md:text-2xl font-semibold tracking-wide">Dashboard {admin.name} !</h1>
      <button type="submit" onClick={hanglelogout} className=' bg-black py-1 px-6 top-4 my-6 md:rounded-full  rounded-3xl  border-amber-50 border-b-2  border-r-2 hover:bg-[#6F6F6F]'>Log out</button>   
      </div>


      {/* Main Content */}
      <div className="">
        <h1 className="md:text-3xl font-bold text-center my-8 
bg-gradient-to-b from-black via-white  bg-clip-text text-transparent">
  Welcome to the Dashboard
</h1>

  <div className="max-w-2xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay:  0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/10 backdrop-blur-md p-10 shadow-lg"
            
          >
             <button onClick={()=> navigate('/createtasks')}>
        
        <h6 className='text-amber-50 absolute bottom-10 text-2xl font-bold uppercase left-1/2 transform -translate-x-1/2'>Create Task </h6>
      </button>

            
                    {/* <h1>Create tasks</h1> */}

          </motion.div>
      </div>
      
      
        <div className="max-w-2xl mx-auto px-6  ">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay:  0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/10 backdrop-blur-md p-10 shadow-lg"
          >

             <button onClick={()=>navigate('/viewtasks')}>
        <h6 className='text-amber-50 absolute text-2xl font-bold uppercase bottom-10 left-1/2 transform -translate-x-1/2'>View Task</h6>

      </button> 

                    {/* <h1>view tasks</h1> */}

          </motion.div>
      </div>
      </div>
    
    </div>
    </>
  );
};

export default Dashboard;
