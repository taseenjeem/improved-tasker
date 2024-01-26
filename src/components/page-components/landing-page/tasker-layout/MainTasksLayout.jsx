import { useContext, useState } from "react";
import TableRow from "./TableRow";
import TaskerHeader from "./TaskerHeader";
import { TaskReducerContext } from "../../../../context/all-context";
import AddTaskModal from "../modals/AddTaskModal";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import { toast } from "react-toastify";

const MainTasksLayout = () => {
  const { state, dispatch } = useContext(TaskReducerContext);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditTaskModal(true);
  };

  const handleSetFavorite = (task) => {
    dispatch({
      type: "SET_FAVORITE",
      payload: { id: task.id },
    });
  };

  const handleDeleteTask = (task) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      dispatch({
        type: "DELETE_TASK",
        payload: { id: task.id },
      });

      toast.success("Task deleted successfully", { position: "top-center" });
    }
  };

  const handleDeleteAllTasks = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (isConfirmed) {
      dispatch({
        type: "DELETE_ALL_TASKS",
      });

      toast.success("All tasks deleted successfully", {
        position: "top-center",
      });
    }
  };

  const filteredTasks = state.taskData.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {addTaskModal && (
        <AddTaskModal setAddTaskModal={setAddTaskModal} dispatch={dispatch} />
      )}
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
            <TaskerHeader
              setAddTaskModal={setAddTaskModal}
              onDeleteAllTask={handleDeleteAllTasks}
              onSearch={(terms) => setSearchQuery(terms)}
            />
            {filteredTasks.length <= 0 ? (
              <p className="text-center text-3xl">Task List is empty!</p>
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
