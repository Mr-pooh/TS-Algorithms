import React, { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { TArr, randomArr, sortSelection, sortingBuble } from "./sortingFunctions";




export const Sorting: FC = () => {
  const [checked, setChecked] = useState<string>("выбор");
  const [sort, setSort] = useState<Direction>();
  const [arr, setArr] = useState<TArr[]>([]);
  const [load, setLoad] = useState(false);

  const createNewArr = () => {
    setArr(randomArr());
  };

  const changeOptionValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
  };

  const handleClick = (sorting: Direction) => {
    setSort(sorting);
    if(checked === 'выбор'){
      sortSelection(arr, setArr, setLoad, sorting, delay, DELAY_IN_MS);
    }
    if(checked === 'пузырёк'){
      sortingBuble(arr, setArr, setLoad, sorting, delay, DELAY_IN_MS)
    }
  };

  const setLoading = (direction: Direction) => {
    if (sort === direction && load === true) {
      return true;
    } else {
      return false;
    }
  };

  const setDisabled = (direction: Direction) => {
    if (sort !== direction && load === true) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    setArr([...randomArr()]);
    return () => {
      setArr([]);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.selections}>
        <div className={styles.radioInput}>
          <RadioInput
            label="Выбор"
            value="выбор"
            checked={checked === "выбор" ? true : false}
            onChange={changeOptionValue}
            disabled={load}
          ></RadioInput>
          <RadioInput
            label="Пузырёк"
            value="пузырёк"
            checked={checked === "пузырёк" ? true : false}
            onChange={changeOptionValue}
            disabled={load}
          ></RadioInput>
        </div>
        <div className={styles.buttons}>
          <div className={styles.selectionsButtons}>
            <Button
              sorting={Direction.Ascending}
              text={`По возрастанию`}
              onClick={() => handleClick(Direction.Ascending)}
              isLoader={setLoading(Direction.Ascending)}
              disabled={setDisabled(Direction.Ascending)}
            ></Button>
            <Button
              sorting={Direction.Descending}
              text={`По убыванию`}
              onClick={() => handleClick(Direction.Descending)}
              isLoader={setLoading(Direction.Descending)}
              disabled={setDisabled(Direction.Descending)}
            ></Button>
          </div>
          <Button
            text={`Новый массив`}
            onClick={createNewArr}
            disabled={load}
          ></Button>
        </div>
      </div>
      <ul className={styles.containTabble}>
        {arr.map((item, index) => {
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
