import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Viewtasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState(""); 
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`https://task4-e2qw.onrender.com/task/tasks/${adminId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        console.log("Fetched Data:", data);
        setTasks(data.tasks || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [adminId, token]);

  const handledelete = async (taskId) => {
    try {
      const res = await fetch(`https://task4-e2qw.onrender.com/task/delete/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      const data = await res.json();
      console.log("Task deleted successfully:", data);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.content?.toLowerCase().includes(search.toLowerCase()) ||
      t.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white flex flex-col items-center py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 tracking-wide text-[#fff]">
        Client Invoices
      </h2>

      
      <div className="mb-6 w-full max-w-5xl">
        <input
          type="text"
          placeholder="Search by task, content, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-md"
        />
      </div>

      {/* Table container */}
      <div className="w-full max-w-5xl bg-white/5 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md border border-white/10">
        {/* Header */}
        <div className="grid grid-cols-5 bg-white/10 text-gray-300 uppercase font-semibold text-sm tracking-widest py-4 px-6">
          <span className="text-left ">No.</span>
          <span className="text-center mr-6">Tasks</span>
          <span className="text-center">Content</span>
          <span className="text-right ml-4">Status</span>
          <span className="text-right ml-5">Delete</span>

        </div>

        {/* Scrollable list */}
        <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No matching tasks found.
            </div>
          ) : (
            filteredTasks.map((t, index) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-5 items-center py-4 px-6 border-b border-white/10 hover:bg-white/10 transition"
              >
                <div className="text-left text-lg font-semibold">
                  {index + 1}
                </div>
                <div className="text-center mr-3 font-medium">{t.name}</div>
                <div className="text-center font-medium">{t.content}</div>
                <div className="text-right font-semibold ml-3">
                  {t.status}
                </div>
                <div>
                  <button
                    onClick={() => handledelete(t._id)}

                    className="md:ml-30 px-4 py-2 ml-2 text-white font-semibold transition"  
                  >
                    <img src="/public/icons8-delete3.svg" alt="Delete" className="w-96 h-6" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewtasks;
