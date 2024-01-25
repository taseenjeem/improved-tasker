import { toast } from "react-toastify";

const AddTaskModal = ({ setAddTaskModal, taskData, setTaskData }) => {
  // Handle task add form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Extract values from form inputs
    const title = e.target.title.value;
    const task_description = e.target.description.value;
    const tags = e.target.tags.value;
    const priority = e.target.priority.value;

    // Create a new task object
    const newTask = {
      id: crypto.randomUUID(),
      title,
      task_description,
      tags: tags.split(","), // Split tags into an array
      priority,
      isFavorite: false,
    };

    // Update taskData state with the new task
    setTaskData([...taskData, newTask]);

    // Reset the form inputs
    e.target.reset();

    // Close the modal
    setAddTaskModal(false);

    // Show success toast
    toast.success("New task added successfully!");
  };

  return (
    <>
      <div className="bg-[#2d323fd5] w-full h-full flex justify-center items-center fixed top-0 left-0 z-50 px-5">
        <form
          onSubmit={handleOnSubmit}
          className="my-10 w-full max-w-[740px] max-h-[645px] h-full rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20"
        >
          <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
            Add New Task
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
                required
              />
            </div>
            {/* description */}
            <div className="space-y-1">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                type="text"
                name="description"
                id="description"
                required
                defaultValue={""}
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
                  required
                />
              </div>
              {/* priority */}
              <div className="space-y-1">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  id="priority"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
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
              onClick={() => setAddTaskModal(false)}
            >
              Cancel
            </button>
            {/* Submit button */}
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Create new Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaskModal;
