import React from "react";
import AddTask from "../componenets/ui/AddTask";
import { Context } from "../context/userContext";
import { IoCloseOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const Tasks = () => {
  const { isOpenModal, openModal, closeModal, taskList } = Context();
  return (
    <div>
      <div className="flex-center justify-between">
        <h1>Tasks</h1>
        <button className="button w-auto cursor-pointer" onClick={openModal}>
          {" "}
          + Add Task
        </button>
      </div>
      {/* open modal  */}
      <div>
        {isOpenModal && (
          <div className="inset-0 fixed bg-black/30 flex-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg relative w-[30rem]">
              <button
                className="absolute top-2 right-2 text-black"
                onClick={closeModal}
              >
                <IoCloseOutline className="cursor-pointer" />
              </button>
              <AddTask />
            </div>
          </div>
        )}
      </div>
      <div className="task-card">
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <div key={task.id}>
              <h2 className="font-bold text-xl">{task.taskTitle}</h2>
              <p>Assigned To: {task.assignedTo}</p>
              <p>Status: {task.taskStatus}</p>
              <p>Date: {task.taskDate}</p>
              <p>Level: {task.level}</p>
              <div className="flex-center gap-3">
                <FaTrash className="cursor-pointer" />
                <FiEdit className="cursor-pointer" />
              </div>
            </div>
          ))
        ) : (
          <p>No Tasks Available</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
