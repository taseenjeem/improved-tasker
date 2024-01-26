import { useState } from "react";
import { toast } from "react-toastify";

const UpdateTaskModal = ({ setEditTaskModal, selectedTask, dispatch }) => {
  // State to track the edited task data
  const [editedTask, setEditedTask] = useState(selectedTask);

  // State to track whether there are changes in the form
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the editedTask state with the changed input value
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));

    // Set the form changed state to true when input changes
    setIsFormChanged(true);
  };

  // Function to handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Extract values from form inputs
    const title = e.target.title.value;
    const task_description = e.target.task_description.value;
    const tags = e.target.tags.value;
    const priority = e.target.priority.value;

    // Check if any of the required fields are empty
    if (
      title.length <= 0 ||
      task_description.length <= 0 ||
      tags.length <= 0 ||
      priority.length <= 0
    ) {
      // Display an error toast if any required field is empty
      toast.error("Ops! You can't leave any field empty.", {
        position: "top-center",
      });
    } else {
      // Create an object with the updated task data
      const editedTaskData = {
        ...selectedTask,
        title,
        task_description,
        tags: tags.split(","),
        priority,
        isFavorite: selectedTask.isFavorite,
      };

      // Dispatch the UPDATE_TASK_DATA action
      dispatch({
        type: "UPDATE_TASK_DATA",
        payload: editedTaskData,
      });

      // Display a success toast
      toast.success("Task updated successfully", { position: "top-center" });

      // Close the modal
      setEditTaskModal(false);

      // Reset the form changed state to false after submission
      setIsFormChanged(false);
    }
  };

  // Disable the "Edit Task" button when there are no changes
  const isEditButtonDisabled = !isFormChanged;

  return (
    <>
      <div className="bg-[#2d323fd5] w-full h-full flex justify-center items-center fixed top-0 left-0 z-50 px-5">
        <form
          onSubmit={handleOnSubmit}
          className="my-10 w-full max-w-[740px] max-h-[645px] h-full rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20"
        >
          <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
            Edit This Task
          </h2>
          {/* inputs */}
          <div className="space-y-3 lg:space-y-7 text-white">
            {/* title */}
            <div className="space-y-1">
              <label htmlFor="title">Title</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="title"
                id="title"
                value={editedTask.title}
                onChange={handleInputChange}
              />
            </div>
            {/* description */}
            <div className="space-y-1">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                type="text"
                name="task_description"
                id="task_description"
                value={editedTask.task_description}
                onChange={handleInputChange}
              />
            </div>
            {/* input group */}
            <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
              {/* tags */}
              <div className="space-y-1">
                <label htmlFor="tags">Tags</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  name="tags"
                  id="tags"
                  value={editedTask.tags}
                  onChange={handleInputChange}
                />
              </div>
              {/* priority */}
              <div className="space-y-1">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  id="priority"
                  value={editedTask.priority}
                  onChange={handleInputChange}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>
          {/* inputs ends */}
          <div className="mt-8 flex justify-between">
            {/* Cancel button */}
            <button
              type="reset"
              className="rounded bg-red-500 px-4 py-2 text-white transition-all hover:opacity-80"
              onClick={() => setEditTaskModal(false)}
            >
              Cancel
            </button>
            {/* Submit button */}
            <button
              type="submit"
              className={`rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80 ${
                isEditButtonDisabled && "not-allowed bg-blue-500 opacity-20"
              }`}
              disabled={isEditButtonDisabled}
            >
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateTaskModal;
