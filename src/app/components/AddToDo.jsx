import Image from "next/image";

const AddToDo = ({ submitToDo, handleChange, newToDo }) => {
  return (
    <div>
      <form className="w-full flex gap-2" onSubmit={submitToDo}>
        <input
          type="text"
          placeholder="Add a new task"
          id="toDo"
          value={newToDo}
          onChange={handleChange}
          maxLength={38}
          className="w-[90%] h-12 px-4 py-3 rounded-[10px] border-[#9E78CF] border-2 bg-[#1D1825] text-[#fff] focus:border-[#9E78CF]"
        />
        <button className="bg-[#9E78CF] text-white h-[48px] w-[48px] rounded-[10px] relative">
          <Image
            src="/plus.svg"
            height={20}
            width={20}
            alt="plus icon"
            className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
          />
        </button>
      </form>
    </div>
  );
};
export default AddToDo;
``;
