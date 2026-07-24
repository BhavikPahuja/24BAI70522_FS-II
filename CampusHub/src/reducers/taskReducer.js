function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [action.payload, ...state];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task,
      );

    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );

    default:
      return state;
  }
}

export default taskReducer;
