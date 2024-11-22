import React from "react";
import { TodoItem } from "~/types/todoItem";

type Props = {
  typeList: string;
  fruits: TodoItem[];
  vegetables: TodoItem[];
  setFruits: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setVegetables: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  timeouts: Record<string, NodeJS.Timeout>;
  button: string;
};

export default function ColumnList({
  typeList,
  fruits,
  vegetables,
  setFruits,
  setVegetables,
  setTodoList,
  timeouts,
  button,
}: Props) {
  const returnToMainList = (type: string) => {
    const list = type === "Fruit" ? fruits : vegetables;
    if (!list.length) return;

    const item = list[0];
    clearTimeout(timeouts[item.name]);

    const setList = type === "Fruit" ? setFruits : setVegetables;
    setList((prev) =>
      prev.filter(
        ({ name, type: itemType }) =>
          name !== item.name && itemType === item.type
      )
    );

    setTodoList((prev) => [...prev, item]);
  };

  return (
    <div className={column}>
      <p className={title}>{typeList}</p>
      <div className={divider}></div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => returnToMainList(typeList)}
        onKeyDown={(e) => e.key === "Enter" && returnToMainList(typeList)}
        className="cursor-pointer h-full gap-4 flex flex-col flex-1"
      >
        {(typeList === "Fruit" ? fruits : vegetables).map(({ name }, index) => (
          <div key={index}>
            <button className={button}>{name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const column =
  "flex flex-col flex-1 gap-4 rounded-3xl border border-gray-700 p-6 dark:border-gray-700 h-full";

const title =
  "leading-6 text-gray-700 dark:text-gray-200 text-center font-semibold";

const divider = "border border-gray-700 dark:border-gray-700";
