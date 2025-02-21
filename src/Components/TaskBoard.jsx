import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [newTask, setNewTask] = useState({ title: "", description: "", category: "todo" });
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("https://job-task-backend-one.vercel.app/tasks")
      .then((res) => {
        const categorizedTasks = {
          todo: res.data.filter(task => task.category === "todo"),
          inProgress: res.data.filter(task => task.category === "inProgress"),
          done: res.data.filter(task => task.category === "done"),
        };
        setTasks(categorizedTasks);
      })
      .catch(() => console.error("Failed to load tasks"));
  }, []);

  // Handle drag and drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same category
      const updatedTasks = Array.from(tasks[source.droppableId]);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
  
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: updatedTasks,
      }));
  
      try {
        await axios.put(`https://job-task-backend-one.vercel.app/tasks/reorder`, {
          category: source.droppableId,
          tasks: updatedTasks.map((task) => task._id),
        });
      } catch {
        console.error("Failed to reorder tasks");
      }
    } else {
      // Moving to a different category
      const sourceList = [...tasks[source.droppableId]];
      const destList = [...tasks[destination.droppableId]];
      const movedTask = { ...sourceList[source.index] };
  
      sourceList.splice(source.index, 1);
      movedTask.category = destination.droppableId;
      destList.splice(destination.index, 0, movedTask);
  
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      }));
  
      try {
        await axios.put(`https://job-task-backend-one.vercel.app/tasks/${movedTask._id}`, movedTask);
      } catch {
        console.error("Failed to update task category");
      }
    }
  };
  
  // Handle adding a task
  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description) {
      toast.error("Title and Description are required!");
      return;
    }

    const taskWithTimestamp = { ...newTask, timestamp: new Date().toISOString() };

    try {
      const res = await axios.post("https://job-task-backend-one.vercel.app/tasks", taskWithTimestamp);
      setTasks(prev => ({
        ...prev,
        [newTask.category]: [...prev[newTask.category], res.data.task],
      }));
      toast.success("Task added successfully!");
      setNewTask({ title: "", description: "", category: "todo" });
    } catch {
      console.error("Failed to add task");
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id, category) => {
    try {
      await axios.delete(`https://job-task-backend-one.vercel.app/tasks/${id}`);
      setTasks(prev => ({
        ...prev,
        [category]: prev[category].filter(task => task._id !== id),
      }));
      toast.success("Task deleted successfully!");
    } catch {
      console.error("Failed to delete task");
    }
  };

  // Open edit modal
  const openEditModal = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  // Handle updating a task
  const handleUpdateTask = async () => {
    try {
      await axios.put(`https://job-task-backend-one.vercel.app/tasks/${editTask._id}`, editTask);
      setTasks(prev => ({
        ...prev,
        [editTask.category]: prev[editTask.category].map(task => task._id === editTask._id ? editTask : task),
      }));
      toast.success("Task updated successfully!");
      setIsModalOpen(false);
    } catch {
      console.error("Failed to update task");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <h1 className="text-xl font-bold mb-4">Task Management Board</h1>

      {/* Task Adding Form */}
      <div className="mb-4">
        <input type="text" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="p-2 border rounded mr-2"/>
        <input type="text" placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="p-2 border rounded mr-2"/>
        <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} className="p-2 border rounded">
          <option value="todo">To-Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={handleAddTask} className="ml-2 p-2 bg-blue-500 text-white rounded">Add Task</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {["todo", "inProgress", "done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w-1/3 bg-gray-200 p-3 min-h-[200px]">
                  <h2 className="text-lg font-bold mb-2">{category.toUpperCase()}</h2>
                  {tasks[category].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white p-2 mb-2 rounded shadow flex justify-between items-center">
                          <span>{task.title}</span>
                          <div className="flex space-x-2">
                            <FaEdit className="text-blue-500 cursor-pointer" onClick={() => openEditModal(task)} />
                            <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteTask(task._id, category)} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Edit Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Edit Task</h2>
            <input type="text" value={editTask.title} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} className="p-2 border rounded w-full mb-2"/>
            <input type="text" value={editTask.description} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} className="p-2 border rounded w-full mb-2"/>
            <button onClick={handleUpdateTask} className="p-2 bg-green-500 text-white rounded mr-2">Update</button>
            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default TaskBoard;
