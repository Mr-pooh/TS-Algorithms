import React, { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS, delay } from "../../constants/delays";

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

const sortSelection = async (
  arr: TArr[],
  setArr: Dispatch<SetStateAction<TArr[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>,
  method: Direction
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length - 1; i++) {
      let isElement = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(DELAY_IN_MS);
        if (method === Direction.Ascending) {
          if (arr[j].value < arr[isElement].value) {
            isElement = j;
          }
        }
        if (method === Direction.Descending) {
          if (arr[j].value > arr[isElement].value) {
            isElement = j;
          }
        }
        arr[j].color = ElementStates.Default;
        setArr([...arr]);
      }
      [arr[i].value, arr[isElement].value] = [
        arr[isElement].value,
        arr[i].value,
      ];
      arr[i].color = ElementStates.Modified;
    }
    arr[arr.length - 1].color = ElementStates.Modified;
    setArr([...arr]);
  }
  setLoader(false);
};

const sortingBuble = async (
  arr: TArr[],
  setArray: Dispatch<SetStateAction<TArr[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>,
  method: Direction
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArray([...arr]);
        await delay(DELAY_IN_MS);
        if (method === Direction.Ascending) {
          if (arr[j].value > arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          }
        }
        if(method === Direction.Descending) {
          if (arr[j].value < arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          };
        }
        arr[j].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
      setArray([...arr]);
    }
  }
  setLoader(false);
};

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
      sortSelection(arr, setArr, setLoad, sorting);
    }
    if(checked === 'пузырёк'){
      sortingBuble(arr, setArr, setLoad, sorting)
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
