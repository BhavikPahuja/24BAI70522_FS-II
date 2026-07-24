import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import useFetch from "../hooks/useFetch";

function DashboardPage(props) {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  return (
    <div>
      <Navbar studentName={props.user?.name} />
      <div>
        <Sidebar />
        <div>
          <Dashboard
            studentName={props.user?.name || "Bhavik"}
            tasks={props.tasks}
            dispatch={props.dispatch}
            posts={data.slice(0, 10)}
            loadingPosts={loading}
            postError={error}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
