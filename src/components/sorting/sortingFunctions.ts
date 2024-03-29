import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

export type TArr = {
  value: number;
  color: ElementStates;
};

export const randomArr = (): TArr[] => {
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

export const sortSelection = async (
  arr: TArr[],
  setArr: Dispatch<SetStateAction<TArr[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>,
  method: Direction,
  delay: (ms: number) => Promise<void>,
  ms: number
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length - 1; i++) {
      let isElement = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(ms);
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


export const sortingBuble = (
  arr: TArr[],
  method: Direction,
) => {
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        
        if (method === Direction.Ascending) {
          if (arr[j].value > arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          }
        }
        if (method === Direction.Descending) {
          if (arr[j].value < arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          }
        }
      }
      return arr
    }
  }
};

/*
export const sortingBuble = async (
  arr: TArr[],
  setArray: Dispatch<SetStateAction<TArr[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>,
  method: Direction,
  delay: (ms: number) => Promise<void>,
  ms: number
) => {
  setLoader(true);
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArray([...arr]);
        await delay(ms);
        if (method === Direction.Ascending) {
          if (arr[j].value > arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          }
        }
        if (method === Direction.Descending) {
          if (arr[j].value < arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          }
        }
        arr[j].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
      setArray([...arr]);
    }
  }
  setLoader(false);
};
*/