import React from "react";
import { Context } from "../context/userContext";

const Dashboard = () => {
  const { taskList } = Context();
  return (
    <div>
      <div className="task">
        <h1>Total Task</h1>
        <p>{taskList.length}</p>
      </div>
      <div className="task">
        <h1>Completed Task</h1>
        <p>{taskList.length}</p>
      </div>
      <div className="task">
        <h1>Pending Task</h1>
        <p>{taskList.length}</p>
      </div>
      <div className="task">
        <h1>Todo Task</h1>
        <p>{taskList.length}</p>
      </div>
    </div>
  );
};

export default Dashboard;
