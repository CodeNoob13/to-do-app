"use client";

import AddToDo from "./components/AddToDo";
import { useState } from "react";
import ToDo from "./components/ToDo";
import ToDoContainer from "./components/ToDoContainer";
import CompletedToDo from "./components/CompletedToDo";
import { v4 } from "uuid";

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
    // Set completed item isCompleted to true
    setToDo((prev) => {
      const updatedToDo = prev.map((item) =>
        id === item.id ? { ...item, isCompleted: !item.isCompleted } : item
      );

      // Filter the items that have been completed
      const items = updatedToDo.filter((item) => item.isCompleted);

      setCompletedToDo((prev) => {
        // Create a variable that has unique items
        const completedItems = items.filter(
          (completedItem) =>
            // Check if completedItem.id is not the same as our items in our current list
            !prev.some((item) => item.id === completedItem.id)
        );

        return [...prev, ...completedItems];
      });
      ``;

      return updatedToDo;
    });
    deleteTask(id);
  };

  console.log(completedToDo);

  // Add newToDo function
  const addToDo = () => {
    setToDo((p) => [
      ...p,
      {
        id: v4(),
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
        {completedToDo.length > 0 && (
          <CompletedToDo length={completedToDo.length}>
            {completedToDo.flat().map((toDo) => (
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
          </CompletedToDo>
        )}
      </div>
    </div>
  );
}
