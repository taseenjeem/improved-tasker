import { useContext, useState } from "react";
import TableRow from "./TableRow";
import TaskerHeader from "./TaskerHeader";
import { TaskReducerContext } from "../../../../context/all-context";
import AddTaskModal from "../modals/AddTaskModal";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import { toast } from "react-toastify";

const MainTasksLayout = () => {
  // Access the task state and dispatch function from the context
  const { state, dispatch } = useContext(TaskReducerContext);

  // States to manage modals, selected task, and search query
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle editing a task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditTaskModal(true);
  };

  // Function to set a task as favorite
  const handleSetFavorite = (task) => {
    dispatch({
      type: "SET_FAVORITE",
      payload: { id: task.id },
    });
  };

  // Function to handle deleting a task with confirmation
  const handleDeleteTask = (task) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      dispatch({
        type: "DELETE_TASK",
        payload: { id: task.id },
      });

      // Display success toast after deleting the task
      toast.success("Task deleted successfully", { position: "top-center" });
    }
  };

  // Function to handle deleting all tasks with confirmation
  const handleDeleteAllTasks = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (isConfirmed) {
      dispatch({
        type: "DELETE_ALL_TASKS",
      });

      // Display success toast after deleting all tasks
      toast.success("All tasks deleted successfully", {
        position: "top-center",
      });
    }
  };

  // Filter tasks based on the search query
  const filteredTasks = state.taskData.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* New task adding modal */}
      {addTaskModal && (
        <AddTaskModal setAddTaskModal={setAddTaskModal} dispatch={dispatch} />
      )}
      {/* Modal of updating an existing task */}
      {editTaskModal && (
        <UpdateTaskModal
          setEditTaskModal={setEditTaskModal}
          dispatch={dispatch}
          selectedTask={selectedTask}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {/* TaskerHeader component for task management */}
            <TaskerHeader
              setAddTaskModal={setAddTaskModal}
              onDeleteAllTask={handleDeleteAllTasks}
              onSearch={(terms) => setSearchQuery(terms)}
            />
            {filteredTasks.length <= 0 ? (
              <p className="text-center text-3xl">Task List is empty!</p>
            ) : (
              <div className="overflow-auto">
                {/* Table for displaying tasks */}
                <table className="table-fixed overflow-auto xl:w-full">
                  <thead>
                    <tr>
                      <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]" />
                      <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                        {" "}
                        Title{" "}
                      </th>
                      <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                        {" "}
                        Description{" "}
                      </th>
                      <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                        {" "}
                        Tags{" "}
                      </th>
                      <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                        {" "}
                        Priority{" "}
                      </th>
                      <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                        {" "}
                        Options{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render TableRow component for each task */}
                    {filteredTasks.map((task) => (
                      <TableRow
                        key={task.id}
                        taskDetails={task}
                        onEditTask={handleEditTask}
                        onSetFavorite={handleSetFavorite}
                        onDeleteTask={handleDeleteTask}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainTasksLayout;
