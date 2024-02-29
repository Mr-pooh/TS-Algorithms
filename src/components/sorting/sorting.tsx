import React, { FC, useState } from "react";
import styles from "./sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";

type TArr = {
  value: number;
  color: ElementStates;
};

const randomArr = (): TArr[] => {
  const randomLength = Math.floor(Math.random() * 15 + 3);
  const arr: TArr[] = [];
  let i = 0;
  while (i < randomLength) {
    arr.push({
      value: Math.floor(Math.random() * 101),
      color: ElementStates.Default,
    });
    i++;
  }
  return arr;
};

export const Sorting: FC = () => {
  const [arr, setArr] = useState<TArr[]>([]);

  const createNewArr = () => {
    setArr([...randomArr()]);
  };



  console.log(arr);
  return (
    <div className={styles.container}>
      <div className={styles.selections}>
        <div className={styles.radioInput}>
          <RadioInput label="Выбор" value="выбор"></RadioInput>
          <RadioInput label="Пузырёк" value="пузырёк"></RadioInput>
        </div>
        <div className={styles.buttons}>
          <div className={styles.selectionsButtons}>
            <Button
              sorting={Direction.Ascending}
              text={`По возрастанию`}
            ></Button>
            <Button
              sorting={Direction.Descending}
              text={`По убыванию`}
            ></Button>
          </div>
          <Button text={`Новый массив`} onClick={createNewArr}></Button>
        </div>
      </div>
      <ul className={styles.containTabble}>
        {arr &&
          arr.map((item, index) => {
            return (
              <li key={index} className={styles.elementTabble}>
                <Column index={item.value} state={item.color}></Column>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
