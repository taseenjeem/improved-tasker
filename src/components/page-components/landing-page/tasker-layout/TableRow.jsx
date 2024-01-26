const TableRow = ({ taskDetails, onEditTask, onDeleteTask }) => {
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
      <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
        <td>
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
        </td>
        <td>{taskDetails.title}</td>
        <td>
          <div>{taskDetails.task_description}</div>
        </td>
        <td>
          <ul className="flex justify-center gap-1.5 flex-wrap">
            {taskDetails.tags.map((tag) => (
              <li key={tag}>
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
        <td className="text-center">{taskDetails.priority}</td>
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
