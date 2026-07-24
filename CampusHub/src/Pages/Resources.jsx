import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ResourceList from "../components/ResourceList";

function ResourcesPage(props) {
  return (
    <div>
      <Navbar studentName={props.user?.name} />
      <div>
        <Sidebar />
        <div>
          <h2>Resource Library</h2>
          <ResourceList
            resources={props.resources}
            onAddResource={props.onAddResource}
            onDeleteResource={props.onDeleteResource}
          />
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;
