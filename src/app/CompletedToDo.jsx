const CompletedToDo = () => {
  return (
    <div className="flex gap-4 flex-col">
      <h2 className="text-white mt-10 tracking-wider">
        Completed Tasks - {length}
      </h2>
      {children}
    </div>
  );
};

export default CompletedToDo;
