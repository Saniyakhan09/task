import React from 'react'
import { useState } from 'react';
const createtasks = () => {

    const[name,setName] = useState("");
    const[content,setContent] = useState("");
    const[status,setStatus] = useState("pending");
  const[submitStatus,setSubmitStatus] = useState("");

    const handleSubmit = async (e) => {
                e.preventDefault();
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const requestBody = JSON.stringify({
            name,
            content,
            status 
        });
        const res = await fetch("https://taskmangementproject.onrender.com/task/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: requestBody,

        });
          
        if (res.ok) {
            const data = await res.json();
            console.log("Task created successfully:", data);
                    setSubmitStatus("Form submitted successfully!");

           
        } else {
            console.error( res.statusText);
        }
        setTimeout(() => {
            setSubmitStatus("");
        }, 1000);
     
    }

  return (
    <>

    <div className="bg-[#0C0C0C] w-full min-h-screen text-amber-50 flex items-center justify-center">
  <div className="w-[90%] md:w-[50%] lg:w-[40%]">
    <h1 className="text-center uppercase bg-gradient-to-b md:text-4xl from-[#1B1B1B] via-white bg-clip-text text-transparent mb-30 text-2xl md:mb-32">Create Task</h1>

    <form className="flex flex-col space-y-16" onSubmit={handleSubmit}>
      <div>
        <h6 className="mb-1">Name</h6>
        <input
          type="text"
          className="border-b-2 bg-[#0C0C0C] text-amber-50 
                                border-[#1B1B1B]
                                 
                                transition duration-200
                                placeholder-gray-500  w-full focus:outline-none "
          placeholder="Enter Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <h6 className="mb-1">Content</h6>
        <input
          type="text"
          className="border-b-2 w-full bg-[#0C0C0C] text-amber-50 
                                 
                                transition duration-200
                                placeholder-gray-500 focus:outline-none border-[#1B1B1B]"
          placeholder="Enter the Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div>
        <h6 className="mb-1">Status</h6>
        <select
          name="status"
          className="bg-[#1B1B1B] focus:outline-none px-2 py-1"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>

          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="py-2 md:mt-10 px-8 mt-10 rounded-3xl border   
        border-[#1B1B1B] 
        border-t-4  
        border-r-4
         hover:bg-[#1B1B1B] border-[#1B1B1B] transition duration-200"
      >
        Submit 
      </button>
    
      {submitStatus && (
        <p className="text-center mt-2 text-amber-400 font-semibold">
          {submitStatus}
        </p>
      )}
    </form>
  </div>
</div>

        </>

  )
}

export default createtasks;
