import React from "react";

function ResourceCard(props) {
  const resource = props.resource;

  return (
    <div>
      <h4>{resource.title}</h4>
      <p>Category: {resource.category}</p>
      <a href={resource.url} target="_blank" rel="noreferrer">
        Open Resource
      </a>
      <button onClick={() => props.onDelete(resource.id)}>Delete</button>
    </div>
  );
}

export default ResourceCard;
