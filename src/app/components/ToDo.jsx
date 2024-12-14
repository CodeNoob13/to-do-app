import Image from "next/image";

const ToDo = ({ children, completeTask, id, isCompleted, deleteTask }) => {
  return (
    <div className="px-5 py-6 bg-[#15101C] rounded-[10px] justify-between flex">
      <div className={`${isCompleted ? "line-through text-[#78CFB0]" : ""}`}>
        {children}
      </div>
      <div className="flex gap-2">
        <Image
          src="/checkmark.svg"
          height={30}
          width={30}
          alt="checkmark icon"
          className="cursor-pointer"
          onClick={() => completeTask(id)}
        />
        <Image
          src="/delete.svg"
          height={30}
          width={30}
          alt="delete icon"
          className="cursor-pointer"
          onClick={() => deleteTask(id)}
        />
      </div>
    </div>
  );
};

export default ToDo;
