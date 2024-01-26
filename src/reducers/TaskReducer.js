// Initial state for the task management application
const initialState = {
  taskData: [
    {
      id: crypto.randomUUID(),
      title: "Learn React js",
      task_description:
        "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies. React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js etc.",
      tags: ["JavaScript", "JSX", "UI"],
      priority: "High",
      isFavorite: false,
    },
  ],
};

// Reducer function to manage state based on dispatched actions
const taskReducer = (state, action) => {
  switch (action.type) {
    // Action to add a new task to the taskData array
    case "ADD_NEW_TASK":
      return {
        taskData: [...state.taskData, action.payload],
      };

    // Action to update task data based on the provided payload
    case "UPDATE_TASK_DATA":
      return {
        taskData: state.taskData.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    // Action to delete a task based on the provided payload
    case "DELETE_TASK":
      return {
        ...state,
        taskData: state.taskData.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    // Action to toggle the 'isFavorite' property of a task
    case "SET_FAVORITE":
      return {
        ...state,
        taskData: state.taskData.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              isFavorite: !item.isFavorite,
            };
          } else {
            return item;
          }
        }),
      };

    // Action to delete all tasks by resetting the taskData array
    case "DELETE_ALL_TASKS":
      return {
        ...state,
        taskData: [],
      };

    // Default case to return the current state if no matching action is found
    default:
      return state;
  }
};

// Exporting the initial state and the taskReducer function
export { initialState, taskReducer };
