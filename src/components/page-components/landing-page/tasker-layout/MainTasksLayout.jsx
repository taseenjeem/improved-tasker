import { useContext, useState } from "react";
import TableRow from "./TableRow";
import TaskerHeader from "./TaskerHeader";
import { TaskDataContext } from "../../../../context/all-context";
import AddTaskModal from "../modals/AddTaskModal";
import UpdateTaskModal from "../modals/UpdateTaskModal";

const MainTasksLayout = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const { taskData, setTaskData } = useContext(TaskDataContext);

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
          editTaskModal={editTaskModal}
          setEditTaskModal={setEditTaskModal}
          setTaskData={setTaskData}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          {/* Search Box Ends */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskerHeader setAddTaskModal={setAddTaskModal} />
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
                      setEditTaskModal={setEditTaskModal}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainTasksLayout;
