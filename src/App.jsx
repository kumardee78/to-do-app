import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function App() {
  const [inputvalue, setInputValue] = useState("");
  const [tasks, setTask] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  function addTask() {
    if (!isEdit) {
      let obj = { id: Date.now(), task: inputvalue, completed: false };
      setTask([...tasks, obj]);
      setInputValue("");
      // console.log(obj);
    } else {
      let taskCopy = tasks;
      const taskToEdit = taskCopy.find((task) => {
        return task.id === isEdit;
      });
      taskToEdit.task = inputvalue;
      setTask(taskCopy);
      setIsEdit(false);
    }
    setInputValue("");
  }
  // console.log(tasks);
  function deleteTask(index) {
    let temp = tasks.filter((task) => {
      return task.id !== index;
    });
    setTask(temp);
    console.log(temp);
  }
  function edittask(id) {
    const taskToEdit = tasks.find((task) => {
      return task.id === id;
    });
    setInputValue(taskToEdit.task);
    setIsEdit(id);
  }

  function markAsComplete(index) {
    setTask(
      tasks.map((obj) => {
        return obj.id === index ? { ...obj, completed: true } : obj;
      })
    );
  }

  return (
    <div className="py-20 bg-[whiteSmoke] h-screen">
      <div className="md:w-[60%] w-[80%] mx-auto shadow-lg bg-white md:px-10 px-2 py-6">
        <h1 className="text-center text-4xl font-bold mb-6">
          To-Do App
        </h1>
        <input
          type="text"
          placeholder="Enter Your Task"
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border rounded md:w-[80%] w-[65%] md:px-4 px-2 py-2 mr-2"
        />
        <button
          type="button"
          onClick={addTask}
          className="border py-2 md:px-4 px-2 rounded bg-red-500 text-white hover:bg-transparent hover:text-red-500 hover:border-red-500 duration-300"
        >
          {!isEdit ? "Add task" : "Edit Task"}
        </button>
        <div className="py-6 md:text-3xl text-xl">
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id} className="flex py-4">
                  <FaCheck
                    onClick={(e) => {
                      markAsComplete(task.id);
                    }}
                    className="w-[8%] mr-4"
                  />
                  <span
                    className={`${
                      task.completed ? " line-through text-gray-600" : ""
                    } md:w-[30%] w-[60%]`}
                  >
                    {task.task}
                  </span>
                  {task.completed === false && (
                    <MdEdit
                      onClick={(e) => edittask(task.id)}
                      className="w-[8%] mr-2"
                    />
                  )}

                  <MdDelete
                    onClick={(e) => deleteTask(task.id)}
                    className="w-[8%]"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
