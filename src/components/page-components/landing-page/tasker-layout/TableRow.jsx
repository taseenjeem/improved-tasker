const TableRow = ({ taskDetails, onEditTask, onDeleteTask, onSetFavorite }) => {
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      {/* Table row for displaying task details */}
      <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
        {/* Favorite button */}
        <td>
          <button
            title={
              taskDetails.isFavorite
                ? "Remove from favorite"
                : "Add to favorite"
            }
            onClick={() => onSetFavorite(taskDetails)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke={taskDetails.isFavorite ? "yellow" : "white"}
              fill={taskDetails.isFavorite ? "yellow" : "white"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          </button>
        </td>
        {/* Task title */}
        <td>{taskDetails.title}</td>
        {/* Task description */}
        <td>
          <div>{taskDetails.task_description}</div>
        </td>
        {/* Task tags */}
        <td>
          <ul className="flex justify-center gap-1.5 flex-wrap">
            {taskDetails.tags.map((tag, index) => (
              <li key={index}>
                <span
                  className={`inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]`}
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </td>
        {/* Task priority */}
        <td className="text-center">{taskDetails.priority}</td>
        {/* Task options: Delete and Edit buttons */}
        <td>
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => onDeleteTask(taskDetails)}
              className="text-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => onEditTask(taskDetails)}
              className="text-blue-500"
            >
              Edit
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
