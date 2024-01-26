import { useContext, useState } from "react";
import TableRow from "./TableRow";
import TaskerHeader from "./TaskerHeader";
import { TaskDataContext } from "../../../../context/all-context";
import AddTaskModal from "../modals/AddTaskModal";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import { toast } from "react-toastify";

const MainTasksLayout = () => {
  // Context for accessing taskData and setTaskData
  const { taskData, setTaskData } = useContext(TaskDataContext);

  // State for controlling the visibility of the Add Task modal
  const [addTaskModal, setAddTaskModal] = useState(false);

  // State for controlling the visibility of the Edit Task modal
  const [editTaskModal, setEditTaskModal] = useState(false);

  // State to store the selected task for editing
  const [selectedTask, setSelectedTask] = useState(null);

  // Function to handle editing a task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditTaskModal(true);
  };

  // Function to toggle the isFavorite property of a task
  const handleSetFavorite = (task) => {
    // Find the task in taskData based on its id
    const updatedTaskData = taskData.map((item) => {
      if (item.id === task.id) {
        // Toggle the isFavorite property
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      } else {
        return item;
      }
    });

    // Update the taskData state with the new array
    setTaskData(updatedTaskData);
  };

  // Function to handle deleting a task with confirmation
  const handleDeleteTask = (task) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    // If the user confirms, proceed with deletion
    if (confirmDelete) {
      const remainingTasks = taskData.filter((item) => item.id !== task.id);
      setTaskData(remainingTasks);

      // Display a success toast or handle accordingly
      toast.success("Task deleted successfully", { position: "top-center" });
    }
  };

  // Function to handle deleting all tasks with confirmation
  const handleDeleteAllTasks = () => {
    // Display a confirmation dialog
    const confirmDeleteAll = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    // If the user confirms, proceed with deletion
    if (confirmDeleteAll) {
      setTaskData([]);

      // Display a success toast or handle accordingly
      toast.success("All tasks deleted successfully", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {addTaskModal && (
        // Add Task Modal Component
        <AddTaskModal
          setAddTaskModal={setAddTaskModal}
          taskData={taskData}
          setTaskData={setTaskData}
        />
      )}
      {editTaskModal && (
        // Edit Task Modal Component
        <UpdateTaskModal
          setEditTaskModal={setEditTaskModal}
          taskData={taskData}
          setTaskData={setTaskData}
          selectedTask={selectedTask}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          {/* Search Box Ends */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {/* Tasker Header Component */}
            <TaskerHeader
              setAddTaskModal={setAddTaskModal}
              onDeleteAllTask={handleDeleteAllTasks}
            />
            {/* Conditional rendering based on taskData length */}
            {taskData.length <= 0 ? (
              // Displayed when no tasks are found
              <p className="text-center text-3xl">No tasks found!</p>
            ) : (
              // Displayed when there are tasks
              <div className="overflow-auto">
                {/* Tasks Table */}
                <table className="table-fixed overflow-auto xl:w-full">
                  <thead>
                    <tr>
                      {/* Table Header Columns */}
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
                    {/* Render each task as a TableRow component */}
                    {taskData.map((task) => (
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
