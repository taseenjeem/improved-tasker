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

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_TASK":
      return {
        taskData: [...state.taskData, action.payload],
      };
    case "UPDATE_TASK_DATA":
      return {
        taskData: state.taskData.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        taskData: state.taskData.filter(
          (item) => item.id !== action.payload.id
        ),
      };
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
    case "DELETE_ALL_TASKS":
      return {
        ...state,
        taskData: [],
      };
    default:
      return state;
  }
};

export { initialState, taskReducer };
