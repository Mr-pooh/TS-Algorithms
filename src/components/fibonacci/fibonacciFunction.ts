import { Dispatch, SetStateAction } from "react";

export type TArr = Array<number>;

export const funcFibonacci = async (
  number: number,
  setArrElements: Dispatch<SetStateAction<TArr>>,
  delay: (ms: number) => Promise<void>,
  ms: number
) => {
  const numItem = (i: number, arr: TArr) => {
    if (i < 2) {
      return 1;
    } else {
      return arr[i - 2] + arr[i - 1];
    }
  };
  let arr: TArr = [];
  for (let i = 0; i <= number; i++) {
    await delay(ms);
    arr.push(numItem(i, arr));

    setArrElements([...arr]);
  }
};
