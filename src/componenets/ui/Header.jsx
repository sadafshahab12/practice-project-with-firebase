import React from "react";

const Header = () => {
  return (
    <div>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
          alt="task"
        />
        <h1>Task Manager</h1>
      </div>
      <div>
        <input
          type="text"
          className="input w-full"
          placeholder="Search Task...."
        />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Header;
