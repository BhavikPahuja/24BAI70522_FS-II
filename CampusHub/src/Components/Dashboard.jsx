import React from "react";
import TaskList from "./TaskList";

function TaskSection(props) {
  return (
    <div>
      <h3>Recent Tasks</h3>
      <TaskList
        tasks={props.tasks}
        dispatch={props.dispatch}
        studentName={props.studentName}
        showControls={false}
      />
    </div>
  );
}

function Dashboard(props) {
  const totalTasks = props.tasks.length;
  const completedTasks = props.tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div>
      <div>
        <h2>Welcome, {props.studentName}</h2>
        <p>Here is your dashboard summary</p>
      </div>

      <div>
        <div>
          <p>Total Tasks</p>
          <h3>{totalTasks}</h3>
        </div>
        <div>
          <p>Completed Tasks</p>
          <h3>{completedTasks}</h3>
        </div>
        <div>
          <p>Pending Tasks</p>
          <h3>{pendingTasks}</h3>
        </div>
      </div>

      <TaskSection
        tasks={props.tasks}
        dispatch={props.dispatch}
        studentName={props.studentName}
      />

      <div>
        <h3>Top 10 Posts (useFetch)</h3>
        <div>
          {props.loadingPosts ? <p>Loading posts...</p> : null}
          {props.postError ? <p>{props.postError}</p> : null}
          {props.posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
