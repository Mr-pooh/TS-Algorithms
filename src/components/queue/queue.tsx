import React, { ChangeEvent } from "react";
import style from "./queue.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { classQueue } from "./classQueue";
import {
  LENGTH_LARGE,
  LENGTH_MEDIUM,
  MAX_LENGTH_SHORT,
} from "../../constants/constants";

type TQueueItem = {
  value?: string;
  color: ElementStates;
  head?: string;
};

const emptyQueue = Array.from({ length: 7 }, () => ({
  value: "",
  color: ElementStates.Default,
}));

export const Queue: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [queueArr, setQueueArr] = React.useState<TQueueItem[]>(emptyQueue);
  const [disableButtonDelete, setDisableButtonDelete] = React.useState(false);
  const [disableButtonAdd, setDisableButtonAdd] = React.useState(false);
  const [disableButtonRemove, setDisableButtonRemove] = React.useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [queue, setQueue] = React.useState(new classQueue<TQueueItem>(7));

  const addClick = async () => {
    if (inputValue) {
      setDisableButtonAdd(true);
      setInputValue("");
      queue.enqueue({ value: inputValue, color: ElementStates.Default });
      setQueue(queue);
      queueArr[queue.getTail() - 1] = {
        value: "",
        color: ElementStates.Changing,
      };
      setQueueArr([...queueArr]);
      await delay(SHORT_DELAY_IN_MS);
      queueArr[queue.getTail() - 1] = {
        value: inputValue,
        color: ElementStates.Changing,
      };
      setQueueArr([...queueArr]);
      queueArr[queue.getTail() - 1] = {
        value: inputValue,
        color: ElementStates.Default,
      };
      setQueueArr([...queueArr]);
      setDisableButtonAdd(false);
    }
  };

  const deleteClick = async () => {
    setDisableButtonDelete(true);
    queue.dequeue();
    setQueue(queue);
    queueArr[queue.getHead() - 1] = {
      value: queueArr[queue.getHead() - 1].value,
      color: ElementStates.Changing,
    };
    setQueueArr([...queueArr]);
    await delay(SHORT_DELAY_IN_MS);
    queueArr[queue.getHead() - 1] = { value: "", color: ElementStates.Default };
    setQueueArr([...queueArr]);
    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      queueArr[queue.getHead() - 1] = {
        value: "",
        color: ElementStates.Default,
        head: "head",
      };
      setQueueArr([...queueArr]);
    }
    setDisableButtonDelete(false);
  };

  const clearningClick = () => {
    queue.clear();
    setInputValue("");
    setQueueArr(
      Array.from({ length: LENGTH_LARGE }, () => ({
        value: "",
        color: ElementStates.Default,
      }))
    );
  };

  React.useEffect(() => {
    if (queue.getHead() || queue.getTail()) {
      setDisableButtonRemove(true);
    }
  }, [queue]);

  React.useEffect(() => {
    if (inputValue !== "" && queue.getTail() < LENGTH_MEDIUM) {
      setDisableButtonAdd(false);
    }
  }, [inputValue, queue]);

  return (
    <div className={style.main}>
      <div className={style.inputContainer}>
        <section className={style.inputSection}>
          <div className={style.input}>
            <Input
              maxLength={MAX_LENGTH_SHORT}
              isLimitText={true}
              type="text"
              onChange={onChange}
              value={inputValue}
            />
          </div>
          <div className={style.addButton}>
            <Button
              data-testid="btnAddQueue"
              text="Добавить"
              disabled={
                inputValue === "" ||
                disableButtonAdd ||
                queue.getTail() > LENGTH_MEDIUM
              }
              onClick={addClick}
              isLoader={disableButtonAdd}
            />
          </div>
          <div className={style.deleteButton}>
            <Button
              data-testid="btnDeleteQueue"
              text="Удалить"
              disabled={
                queue.isEmpty() || disableButtonDelete || disableButtonAdd
              }
              onClick={deleteClick}
              isLoader={disableButtonDelete}
            />
          </div>
        </section>
        <div className={style.removeButton}>
          <Button
            data-testid="btnClearQueue"
            text="Очистить"
            disabled={
              (!queue.getHead() && !queue.getTail()) ||
              disableButtonAdd ||
              disableButtonDelete
            }
            onClick={clearningClick}
            isLoader={disableButtonRemove}
          />
        </div>
      </div>
      <ul className={style.circles}>
        {queueArr.slice(0, 7).map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value}
              index={index}
              state={item.color}
              head={
                (index === queue.getHead() && !queue.isEmpty()) || item.head
                  ? "head"
                  : ""
              }
              tail={
                index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
