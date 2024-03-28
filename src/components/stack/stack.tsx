import styles from "./stack.module.css";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { StackClass } from "./stackClass";

type TStackItem = {
  value: string;
  color: ElementStates;
};

export const Stack: React.FC = () => {
  const [stackArr, setStackArr] = React.useState<TStackItem[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const [stack] = React.useState(new StackClass<TStackItem>());

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addClick = async () => {
    if (inputValue) {
      stack.push({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      setStackArr([...stack.getElements()]);
      await delay(SHORT_DELAY_IN_MS);
      stack.change()!.color = ElementStates.Default;
      setStackArr([...stack.getElements()]);
    }
  };

  const deleteClick = async () => {
    stack.change()!.color = ElementStates.Changing;
    setStackArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr([...stack.getElements()]);
  };

  const clearningClick = () => {
    stack.clear();
    setStackArr(stack.getElements());
  };

  const infoPosition = (index: number, arr: TStackItem[]): string => {
    if (index === arr.length - 1) {
      return "top";
    } else {
      return "";
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.inputContainer}>
        <section className={styles.inputSection}>
          <div className={styles.input}>
            <Input
              maxLength={4}
              isLimitText={true}
              type="text"
              value={inputValue}
              onChange={onChange}
            />
          </div>
          <div className={styles.addButton}>
            <Button
              text="Добавить"
              onClick={addClick}
              disabled={inputValue === ""}
            />
          </div>
          <div className={styles.deleteButton}>
            <Button
              text="Удалить"
              onClick={deleteClick}
              disabled={!stackArr.length}
            />
          </div>
        </section>
        <div className={styles.clearButton}>
          <Button
            text="Очистить"
            onClick={clearningClick}
            disabled={!stackArr.length}
          />
        </div>
      </div>
      <ul className={styles.circle}>
        {stackArr!.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value}
              state={item.color}
              index={index}
              head={infoPosition(index, stackArr)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
