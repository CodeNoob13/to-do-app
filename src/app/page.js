"use client";

import AddToDo from "./components/AddToDo";
import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import ToDoContainer from "./components/ToDoContainer";
import CompletedToDo from "./components/CompletedToDo";
import { v4 } from "uuid";

export default function Home() {
  const [toDo, setToDo] = useState([]);
  const [newToDo, setNewToDo] = useState("");
  const [completedToDo, setCompletedToDo] = useState([]);

  useEffect(() => {
    const getFromLocalStorage = () => {
      const toDoList = localStorage.getItem("todo");
      const completedList = localStorage.getItem("completed");

      if (toDoList) {
        setToDo(JSON.parse(toDoList));
      }

      if (completedList) {
        setCompletedToDo(JSON.parse(completedList));
      }
    };

    getFromLocalStorage();
  }, []);

  // Delete task | if id !== item.id leave in list
  const deleteTask = (id) => {
    setToDo((prev) => {
      const newTaks = prev.filter((item) => item.id !== id);
      localStorage.setItem("todo", JSON.stringify(newTaks));
      return newTaks;
    });
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
        // Filter our completed items
        const completedItems = items.filter(
          (completedItem) =>
            // Check if the previous array contains an item that has the same id as the item we want to add.

            // If it does contain the same id, we will not add this "!prev" will exclude the item.
            !prev.some((item) => completedItem.id === item.id)
        );

        // Return old array items with new completed task
        const completedArr = [...prev, ...completedItems];

        localStorage.setItem("completed", JSON.stringify(completedArr));
        return completedArr;
      });
      return updatedToDo;
    });
    deleteTask(id);
  };

  // Add newToDo function
  const addToDo = () => {
    setToDo((p) => {
      const newToDoList = [
        ...p,
        {
          id: v4(),
          task: newToDo,
          isCompleted: false,
        },
      ];
      localStorage.setItem("todo", JSON.stringify(newToDoList));
      return newToDoList;
    });
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
    <div className="flex items-center justify-center min-h-screen px-4 py-4">
      <div className="bg-[#1D1825] h-[758px] w-full sm:w-[583px] rounded-[20px] px-6 py-12 sm:px-16 sm:py-12  overflow-y-auto ">
        <AddToDo
          submitToDo={submitToDo}
          handleChange={handleChange}
          newToDo={newToDo}
        />
        <ToDoContainer length={toDo.length}>
          {toDo.map(
            (toDo) =>
              (
                <ToDo
                  key={toDo.id}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                  id={toDo.id}
                  isCompleted={toDo.isCompleted}
                >
                  {toDo.task}
                </ToDo>
              )``
          )}
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
