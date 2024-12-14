const ToDoContainer = ({ children, length }) => {
  return (
    <div className="flex gap-4 flex-col">
      <h2 className="text-white mt-10 tracking-wider">
        Tasks to do - {length}
      </h2>
      {children}
    </div>
  );
};

export default ToDoContainer;
