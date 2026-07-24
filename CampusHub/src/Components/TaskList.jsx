import React, { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { validateTask } from "../utils/validation";

function TaskList(props) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortByDeadline, setSortByDeadline] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function addOrUpdateTask(e) {
    e.preventDefault();

    const error = validateTask(formData);
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage("");

    if (editingTaskId) {
      props.dispatch({
        type: "UPDATE_TASK",
        payload: {
          id: editingTaskId,
          ...formData,
        },
      });
      setEditingTaskId(null);
    } else {
      props.dispatch({
        type: "ADD_TASK",
        payload: {
          id: Date.now(),
          ...formData,
          completed: false,
        },
      });
    }

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      deadline: "",
    });
  }

  function deleteTask(taskId) {
    props.dispatch({
      type: "DELETE_TASK",
      payload: taskId,
    });
  }

  function toggleTask(taskId) {
    props.dispatch({
      type: "TOGGLE_TASK",
      payload: taskId,
    });
  }

  function startEditTask(task) {
    setEditingTaskId(task.id);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
    });
  }

  const processedTasks = useMemo(() => {
    let filteredTasks = props.tasks.filter((task) => {
      const searchValue = searchText.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchValue);
      const descriptionMatch = task.description
        .toLowerCase()
        .includes(searchValue);

      const statusMatch =
        statusFilter === "all"
          ? true
          : statusFilter === "completed"
            ? task.completed
            : !task.completed;

      return (titleMatch || descriptionMatch) && statusMatch;
    });

    if (sortByDeadline) {
      filteredTasks = [...filteredTasks].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline),
      );
    }

    return filteredTasks;
  }, [props.tasks, searchText, statusFilter, sortByDeadline]);

  return (
    <div>
      {props.showControls ? (
        <form onSubmit={addOrUpdateTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Task Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />
          <button type="submit">
            {editingTaskId ? "Update Task" : "Add Task"}
          </button>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </form>
      ) : null}

      <div>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button onClick={() => setSortByDeadline((prev) => !prev)}>
          {sortByDeadline ? "Clear Deadline Sort" : "Sort by Deadline"}
        </button>
      </div>

      <div>
        {processedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            studentName={props.studentName}
            showControls={props.showControls}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={startEditTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
