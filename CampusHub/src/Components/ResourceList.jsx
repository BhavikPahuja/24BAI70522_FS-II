import React, { useMemo, useState } from "react";
import ResourceCard from "./ResourceCard";
import { validateResource } from "../utils/validation";

function ResourceList(props) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    url: "",
  });
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");

  function submitResource(e) {
    e.preventDefault();

    const error = validateResource(formData);
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage("");

    props.onAddResource({
      id: Date.now(),
      ...formData,
    });

    setFormData({
      title: "",
      category: "",
      url: "",
    });
  }

  const filteredResources = useMemo(() => {
    return props.resources.filter((resource) => {
      const searchMatch = resource.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const categoryMatch =
        categoryFilter === "all"
          ? true
          : resource.category.toLowerCase() === categoryFilter.toLowerCase();

      return searchMatch && categoryMatch;
    });
  }, [props.resources, searchText, categoryFilter]);

  const categoryOptions = useMemo(() => {
    const categories = props.resources.map((resource) => resource.category);
    return ["all", ...new Set(categories)];
  }, [props.resources]);

  return (
    <div>
      <form onSubmit={submitResource}>
        <input
          type="text"
          placeholder="Resource Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
        <button type="submit">Add Resource</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>

      <div>
        <input
          type="text"
          placeholder="Search resources"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onDelete={props.onDeleteResource}
          />
        ))}
      </div>
    </div>
  );
}

export default ResourceList;
