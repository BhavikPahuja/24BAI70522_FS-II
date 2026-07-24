import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";

function TasksPage(props) {
  return (
    <div>
      <Navbar studentName={props.user?.name} />
      <div>
        <Sidebar />
        <div>
          <h2>Task Management</h2>
          <TaskList
            tasks={props.tasks}
            dispatch={props.dispatch}
            studentName={props.user?.name || "Bhavik"}
            showControls={true}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
