import { useEffect, useState } from "react"
const storageKey = "kargil_todo_tasks"

const defaultTasks = [
  {
    id: 1,
    title: "Revise React hooks",
    note: "Focus on useEffect, useMemo, and custom hooks",
    priority: "High",
    dueDate: "2026-07-28",
    completed: false,
  },
  {
    id: 2,
    title: "Submit assignment draft",
    note: "Polish the layout before sharing",
    priority: "Medium",
    dueDate: "2026-07-29",
    completed: true,
  },
  {
    id: 3,
    title: "Practice coding review",
    note: "Check edge cases and tidy state flow",
    priority: "Low",
    dueDate: "2026-07-31",
    completed: false,
  },
]

const filters = ["All", "Active", "Completed"]

function loadTasks() {
  const storedTasks = localStorage.getItem(storageKey)

  if (!storedTasks) {
    return defaultTasks
  }

  try {
    const parsedTasks = JSON.parse(storedTasks)
    return Array.isArray(parsedTasks) && parsedTasks.length
      ? parsedTasks
      : defaultTasks
  } catch {
    return defaultTasks
  }
}

function createTask(task) {
  return {
    id: Date.now(),
    title: task.title.trim(),
    note: task.note.trim(),
    priority: task.priority,
    dueDate: task.dueDate,
    completed: false,
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [activeFilter, setActiveFilter] = useState("All")
  const [draft, setDraft] = useState({
    title: "",
    note: "",
    priority: "Medium",
    dueDate: "",
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks))
  }, [tasks])

  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount

  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === "Active") {
      return !task.completed
    }

    if (activeFilter === "Completed") {
      return task.completed
    }

    return true
  })

  function handleDraftChange(event) {
    const { name, value } = event.target

    setDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!draft.title.trim()) {
      return
    }

    setTasks((currentTasks) => [createTask(draft), ...currentTasks])
    setDraft({
      title: "",
      note: "",
      priority: "Medium",
      dueDate: "",
    })
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  function clearCompleted() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed),
    )
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">To-do tracker</span>
          <h1>Organize the day with the same clean CampusHub style.</h1>
          <p>
            Capture work, track progress, and keep the list focused with a
            small reducer-style workflow.
          </p>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Total</span>
            <strong>{tasks.length}</strong>
          </article>
          <article className="stat-card">
            <span>Active</span>
            <strong>{activeCount}</strong>
          </article>
          <article className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </article>
        </div>
      </section>

      <section className="panel">
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Task title
              <input
                name="title"
                value={draft.title}
                onChange={handleDraftChange}
                placeholder="Prepare chapter notes"
                autoComplete="off"
              />
            </label>

            <label>
              Priority
              <select
                name="priority"
                value={draft.priority}
                onChange={handleDraftChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>

            <label>
              Due date
              <input
                type="date"
                name="dueDate"
                value={draft.dueDate}
                onChange={handleDraftChange}
              />
            </label>
          </div>

          <label>
            Notes
            <textarea
              name="note"
              rows="3"
              value={draft.note}
              onChange={handleDraftChange}
              placeholder="Add a short description or context"
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              Add task
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </div>
        </form>

        <div className="toolbar">
          <div className="filter-group" role="tablist" aria-label="Task filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="task-list">
          {visibleTasks.length ? (
            visibleTasks.map((task) => (
              <article
                key={task.id}
                className={`task-card ${task.completed ? "done" : ""}`}
              >
                <div className="task-header">
                  <label className="task-check">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="check-mark" />
                  </label>

                  <div className="task-text">
                    <h2>{task.title}</h2>
                    <p>{task.note || "No description added."}</p>
                  </div>

                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    ×
                  </button>
                </div>

                <div className="task-footer">
                  <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  <span>
                    Due {task.dueDate ? task.dueDate : "soon"}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>No tasks in this view</h2>
              <p>Add a new item or switch back to All.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
