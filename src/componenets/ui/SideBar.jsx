import React from "react";
import { FaTasks, FaTrash } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { LuLayoutDashboard, LuListTodo } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const SideBar = () => {
  return (
    <div className="space-y-6">
      <div className=" flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
          alt="task"
          className="w-10 h-10"
        />
        <h1>Todo</h1>
      </div>
      <div>
        <button className="button w-auto">+ New Task </button>
      </div>
      <div className="space-y-3">
        <a href="/dashboard" className="flex-center gap-3 cursor-pointer">
          <LuLayoutDashboard />
          <p>Dashboard</p>
        </a>
        <a href="/tasks" className="flex-center gap-3 cursor-pointer">
          <FaTasks />
          <p>Tasks</p>
        </a>
        <a href="/completed" className="flex-center gap-3 cursor-pointer">
          <FaCircleCheck />
          <p>Completed</p>
        </a>
        <a href="/pending" className="flex-center gap-3 cursor-pointer">
          <MdPendingActions />
          <p>Pending</p>
        </a>
        <a href="/todo" className="flex-center gap-3 cursor-pointer">
          <LuListTodo />
          <p>ToDo</p>
        </a>
        <a href="/team" className="flex-center gap-3 cursor-pointer">
          <RiTeamFill />
          <p>Team</p>
        </a>
        <a href="/deletedTask" className="flex-center gap-3 cursor-pointer">
          <FaTrash />
          <p>Trash</p>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
