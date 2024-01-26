import { useContext, useState } from "react";
import TableRow from "./TableRow";
import TaskerHeader from "./TaskerHeader";
import { TaskDataContext } from "../../../../context/all-context";
import AddTaskModal from "../modals/AddTaskModal";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import { toast } from "react-toastify";

const MainTasksLayout = () => {
  const { taskData, setTaskData } = useContext(TaskDataContext);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditTaskModal(true);
  };

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
        <AddTaskModal
          setAddTaskModal={setAddTaskModal}
          taskData={taskData}
          setTaskData={setTaskData}
        />
      )}
      {editTaskModal && (
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
            <TaskerHeader
              setAddTaskModal={setAddTaskModal}
              onDeleteAllTask={handleDeleteAllTasks}
            />
            {taskData.length <= 0 ? (
              <p className="text-center text-3xl">No tasks found!</p>
            ) : (
              <div className="overflow-auto">
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
                    {taskData.map((task) => (
                      <TableRow
                        key={task.id}
                        taskDetails={task}
                        onEditTask={handleEditTask}
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
