import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import ColumnList from "~/components/ColumnList";
import { TodoItem } from "~/types/todoItem";

export const meta: MetaFunction = () => {
  return [
    { title: "Auto Delete Todo List" },
    { name: "description", content: "Welcome to Auto Delete Todo List!" },
  ];
};

export default function Index() {
  const [todoList, setTodoList] = useState(initialTodoList);
  const [fruits, setFruits] = useState<TodoItem[]>([]);
  const [vegetables, setVegetables] = useState<TodoItem[]>([]);
  const [timeouts, setTimeouts] = useState<Record<string, NodeJS.Timeout>>({});

  const moveToColumn = (item: TodoItem, index: number) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);

    if (item.type === "Fruit") {
      setFruits((prev) => [...prev, item]);
    } else {
      setVegetables((prev) => [...prev, item]);
    }
    startTimer(item, item.type);

    setTodoList(newTodoList);
  };

  const startTimer = (item: TodoItem, type: string) => {
    const timeoutId = setTimeout(() => {
      if (type === "Fruit") {
        setFruits((prev) => prev.filter((fruit) => fruit !== item));
      } else {
        setVegetables((prev) => prev.filter((vegetable) => vegetable !== item));
      }
      setTodoList((prev) => [...prev, item]);
    }, 5000);

    setTimeouts((prev) => ({ ...prev, [item.name]: timeoutId }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 h-screen">
      {/* Main list */}
      <div className="flex flex-col flex-1 gap-4 rounded-3xl h-full">
        {todoList.map(({ type, name }, index) => (
          <div key={index}>
            <button
              className={button}
              onClick={() => moveToColumn({ type, name }, index)}
            >
              {name}
            </button>
          </div>
        ))}
      </div>

      {/* Fruit and Vegetable lists */}
      {["Fruit", "Vegetable"].map((type) => (
        <ColumnList
          key={type}
          typeList={type}
          fruits={fruits}
          vegetables={vegetables}
          setFruits={setFruits}
          setVegetables={setVegetables}
          setTodoList={setTodoList}
          timeouts={timeouts}
          button={button}
        />
      ))}
    </div>
  );
}

const button =
  "border border-gray-700 p-2 dark:border-gray-700 rounded-3xl w-full";

const initialTodoList = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];
