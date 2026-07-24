export function validateLogin(email, password) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim() || !password.trim()) {
    return "Email and password are required";
  }

  if (!emailPattern.test(email)) {
    return "Enter a valid email";
  }

  return "";
}

export function validateTask(task) {
  if (!task.title.trim()) {
    return "Task title is required";
  }

  if (!task.deadline) {
    return "Task deadline is required";
  }

  return "";
}

export function validateResource(resource) {
  if (!resource.title.trim()) {
    return "Resource title is required";
  }

  if (!resource.category.trim()) {
    return "Resource category is required";
  }

  if (!resource.url.trim()) {
    return "Resource URL is required";
  }

  return "";
}
