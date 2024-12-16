import Image from "next/image";

const CompletedToDo = ({ children, length, reset }) => {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex justify-between items-center mt-10">
        <h2 className="text-white tracking-wider">Done - {length}</h2>
        <button className="flex items-center gap-2" onClick={() => reset()}>
          <Image src="/cross.svg" height={12} width={12} alt="Cross" /> reset
        </button>
      </div>
      {children}
    </div>
  );
};

export default CompletedToDo;
