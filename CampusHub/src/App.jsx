import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useReducer, useState } from "react";
import Login from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import TasksPage from "./pages/Tasks";
import ResourcesPage from "./pages/Resources";
import ProfilePage from "./pages/Profile";
import useLocalStorage from "./hooks/useLocalStorage";
import taskReducer from "./reducers/taskReducer";

const defaultTasks = [
  {
    id: 1,
    title: "Revise DBMS module",
    description: "Complete normalization and SQL joins notes",
    priority: "High",
    completed: false,
    deadline: "2026-07-30",
  },
  {
    id: 2,
    title: "React assignment draft",
    description: "Prepare first draft for CampusHub UI",
    priority: "Medium",
    completed: true,
    deadline: "2026-07-27",
  },
];

const defaultResources = [
  {
    id: 1,
    title: "React Official Docs",
    category: "Development",
    url: "https://react.dev",
  },
  {
    id: 2,
    title: "MDN JavaScript Guide",
    category: "Programming",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  },
];

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const userStorage = useLocalStorage("campusHub_user", null);
  const tasksStorage = useLocalStorage("campusHub_tasks", defaultTasks);
  const resourcesStorage = useLocalStorage(
    "campusHub_resources",
    defaultResources,
  );

  const [tasks, dispatch] = useReducer(
    taskReducer,
    tasksStorage.value && tasksStorage.value.length
      ? tasksStorage.value
      : defaultTasks,
  );

  const [resources, setResources] = useState(
    resourcesStorage.value && resourcesStorage.value.length
      ? resourcesStorage.value
      : defaultResources,
  );

  useEffect(() => {
    tasksStorage.saveData(tasks);
  }, [tasks]);

  useEffect(() => {
    resourcesStorage.saveData(resources);
  }, [resources]);

  function handleLogin({ name, email }) {
    userStorage.saveData({ name, email });
  }

  function handleLogout() {
    userStorage.removeData();
  }

  function addResource(newResource) {
    setResources((prev) => [newResource, ...prev]);
  }

  function deleteResource(resourceId) {
    setResources((prev) =>
      prev.filter((resource) => resource.id !== resourceId),
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            userStorage.value ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={userStorage.value}>
              <DashboardPage
                user={userStorage.value}
                tasks={tasks}
                dispatch={dispatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute user={userStorage.value}>
              <TasksPage
                user={userStorage.value}
                tasks={tasks}
                dispatch={dispatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute user={userStorage.value}>
              <ResourcesPage
                user={userStorage.value}
                resources={resources}
                onAddResource={addResource}
                onDeleteResource={deleteResource}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={userStorage.value}>
              <ProfilePage user={userStorage.value} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
