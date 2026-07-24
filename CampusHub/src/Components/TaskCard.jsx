import React from "react";

function TaskCard(props) {
  const task = props.task;

  return (
    <div>
      <p>Hello, {props.studentName || "Bhavik"}</p>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <div>
        <p>Priority: {task.priority}</p>
        <p>Deadline: {task.deadline}</p>
        <p>{task.completed ? "Completed" : "Pending"}</p>
      </div>

      {props.showControls ? (
        <div>
          <button onClick={() => props.onToggle(task.id)}>
            {task.completed ? "Mark Pending" : "Mark Complete"}
          </button>
          <button onClick={() => props.onEdit(task)}>Edit</button>
          <button onClick={() => props.onDelete(task.id)}>Delete</button>
        </div>
      ) : null}
    </div>
  );
}

export default TaskCard;
