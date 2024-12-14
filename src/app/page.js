"use client";

import AddToDo from "./components/AddToDo";
import { useState } from "react";
import ToDo from "./components/ToDo";
import ToDoContainer from "./components/ToDoContainer";

export default function Home() {
  const [toDo, setToDo] = useState([]);
  const [newToDo, setNewToDo] = useState("");
  const [completedToDo, setCompletedToDo] = useState([]);

  // Delete task | if id !== item.id leave in list
  const deleteTask = (id) => {
    setToDo((prev) => prev.filter((item) => item.id !== id));
  };

  // set completed to True | task completed
  const completeTask = (id) => {
    setToDo((prev) =>
      prev.map((item) =>
        id === item.id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  // Add newToDo function
  const addToDo = () => {
    setToDo((p) => [
      ...p,
      {
        id: p.length + 1,
        task: newToDo,
        isCompleted: false,
      },
    ]);
  };

  // Add toDo to onClick
  const submitToDo = (e) => {
    e.preventDefault();

    if (newToDo) {
      addToDo();
    }
    setNewToDo("");
  };

  // Check change of our input
  const handleChange = (e) => {
    setNewToDo(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-[#1D1825] h-[758px] w-[583px] rounded-[20px] px-16 py-12  overflow-y-auto">
        <AddToDo
          submitToDo={submitToDo}
          handleChange={handleChange}
          newToDo={newToDo}
        />
        <ToDoContainer length={toDo.length}>
          {toDo.map((toDo) => (
            <ToDo
              key={toDo.id}
              deleteTask={deleteTask}
              completeTask={completeTask}
              id={toDo.id}
              isCompleted={toDo.isCompleted}
            >
              {toDo.task}
            </ToDo>
          ))}
        </ToDoContainer>
      </div>
    </div>
  );
}
