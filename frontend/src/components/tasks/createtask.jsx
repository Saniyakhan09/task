import React, { useState } from "react";

const CreateTasks = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("pending");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !content.trim()) {
      setSubmitStatus(" Please fill in all fields before submitting.");
      setTimeout(() => setSubmitStatus(""), 1500);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setSubmitStatus(" No token found. Please log in first.");
      setTimeout(() => setSubmitStatus(""), 1500);
      return;
    }

    const requestBody = JSON.stringify({
      name,
      content,
      status,
    });

    try {
      const res = await fetch("https://taskmangementproject.onrender.com/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: requestBody,
      });

      const data = await res.json();

      if (res.ok) {
        console.log(" Task created successfully:", data);
        setSubmitStatus(" Task created successfully!");
        setName("");
        setContent("");
        setStatus("pending");
      } else {
        console.error(" Error:", data.message);
        setSubmitStatus(` ${data.message || "Failed to create task"}`);
      }
    } catch (err) {
      console.error(" Network error:", err);
      setSubmitStatus(" Something went wrong. Please try again.");
    }

    setTimeout(() => {
      setSubmitStatus("");
    }, 2000);
  };

  return (
    <div className="bg-[#0C0C0C] w-full min-h-screen text-amber-50 flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] lg:w-[40%]">
        <h1 className="text-center uppercase bg-gradient-to-b md:text-4xl from-[#1B1B1B] via-white bg-clip-text text-transparent mb-8 text-2xl">
          Create Task
        </h1>

        <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
          {/* Task Name */}
          <div>
            <h6 className="mb-1">Name</h6>
            <input
              type="text"
              className="border-b-2 bg-[#0C0C0C] text-amber-50 border-[#1B1B1B] transition duration-200 placeholder-gray-500 w-full focus:outline-none"
              placeholder="Enter Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Task Content */}
          <div>
            <h6 className="mb-1">Content</h6>
            <input
              type="text"
              className="border-b-2 w-full bg-[#0C0C0C] text-amber-50 transition duration-200 placeholder-gray-500 focus:outline-none border-[#1B1B1B]"
              placeholder="Enter Task Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Task Status */}
          <div>
            <h6 className="mb-1">Status</h6>
            <select
              name="status"
              className="bg-[#1B1B1B] focus:outline-none px-2 py-1 rounded-md text-amber-50"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2 md:mt-10 px-8 mt-10 rounded-3xl border border-[#1B1B1B] border-t-4 border-r-4 hover:bg-[#1B1B1B] transition duration-200"
          >
            Submit
          </button>

          {/* Message */}
          {submitStatus && (
            <p className="text-center mt-4 text-amber-400 font-semibold">
              {submitStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTasks;
