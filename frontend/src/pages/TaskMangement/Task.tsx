import React, { useState, useEffect } from "react";
import {
  getTaskList,
  addTaskList,
  updateTaskList,
  deleteTaskList,
} from "../../services/backendApiHelper"; // Adjust the path
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define types for tasks and modal
type Task = {
  id: number;
  name: string;
  description: string;
};

type ModalState = {
  isOpen: boolean;
  type: "add" | "edit" | "";
  task: Task | null;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Define tasks as an array of Task
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: "",
    task: null,
  });
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await getTaskList({}); // Ensure you provide required parameters
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  // Handle task save for add/edit
  const handleSave = async () => {
    try {
      if (modal.type === "add") {
        await addTaskList(form);
        toast.success("Task added successfully");
      } else if (modal.type === "edit" && modal.task) {
        await updateTaskList(modal.task.id, form);
        toast.success("Task updated successfully");
      }
      fetchTasks(); // Refresh the task list
      setModal({ isOpen: false, type: "", task: null }); // Close the modal
    } catch (error) {
      toast.error("Failed to save task");
    }
  };

  // Handle task delete
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTaskList(id);
        toast.success("Task deleted successfully");
        fetchTasks();
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  // Open modal for add/edit
  const openModal = (type: "add" | "edit", task: Task | null = null) => {
    setModal({ isOpen: true, type, task });
    setForm(task ? { name: task.name, description: task.description } : { name: "", description: "" });
  };

  // Close modal
  const closeModal = () => setModal({ isOpen: false, type: "", task: null });

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => openModal("add")}
      >
        Add Task
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md"
          >
            <h3 className="font-bold text-lg">{task.name}</h3>
            <p className="text-gray-600">{task.description}</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                onClick={() => openModal("edit", task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-1/3 shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              {modal.type === "add" ? "Add Task" : "Edit Task"}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
