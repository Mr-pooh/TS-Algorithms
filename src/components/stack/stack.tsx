import styles from "./stack.module.css";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { StackClass } from "./stackClass";
import { MAX_LENGTH_SHORT } from "../../constants/constants";

type TStackItem = {
  value: string;
  color: ElementStates;
};

export const Stack: React.FC = () => {
  const [stackArr, setStackArr] = React.useState<TStackItem[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loadAdd, setLoadAdd] = React.useState<boolean>(false);
  const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
  const [loadClear, setLoadClear] = React.useState<boolean>(false);

  const [stack] = React.useState(new StackClass<TStackItem>());

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addClick = async () => {
    if (inputValue) {
      setLoadAdd(true);
      stack.push({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      setStackArr([...stack.getElements()]);
      await delay(SHORT_DELAY_IN_MS);
      stack.change()!.color = ElementStates.Default;
      setStackArr([...stack.getElements()]);
      setLoadAdd(false);
    }
  };

  const deleteClick = async () => {
    setLoadDelete(true);
    stack.change()!.color = ElementStates.Changing;
    setStackArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr([...stack.getElements()]);
    setLoadDelete(false);
  };

  const clearningClick = () => {
    setLoadClear(true);
    stack.clear();
    setStackArr(stack.getElements());
    setLoadClear(false);
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
              maxLength={MAX_LENGTH_SHORT}
              isLimitText={true}
              type="text"
              value={inputValue}
              onChange={onChange}
            />
          </div>
          <div className={styles.addButton}>
            <Button
              data-testid="btnAddStack"
              text="Добавить"
              onClick={addClick}
              disabled={inputValue === "" || loadDelete || loadClear}
              isLoader={loadAdd}
            />
          </div>
          <div className={styles.deleteButton}>
            <Button
              data-testid="btnDeleteStack"
              text="Удалить"
              onClick={deleteClick}
              disabled={!stackArr.length || loadAdd || loadClear}
              isLoader={loadDelete}
            />
          </div>
        </section>
        <div className={styles.clearButton}>
          <Button
            data-testid="btnClearStack"
            text="Очистить"
            onClick={clearningClick}
            disabled={!stackArr.length || loadAdd || loadDelete}
            isLoader={loadClear}
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
