import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";

export type TArray = {
  value: string;
  color: ElementStates;
};

export const reverseElement = async (
  arr: TArray[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArrElements: Dispatch<SetStateAction<TArray[]>>,
  delay: (ms: number) => Promise<void>,
  ms: number
) => {
  setArrElements([...arr]);
  await delay(ms);
  setLoader(true);
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    if (start <= end) {
      arr[start].color = ElementStates.Changing;
      arr[end].color = ElementStates.Changing;
      setArrElements([...arr]);
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
      await delay(ms);
      arr[start - 1].color = ElementStates.Modified;
      arr[end + 1].color = ElementStates.Modified;
      setArrElements([...arr]);
    } else {
      await delay(ms);
      return;
    }
  }
  setLoader(false);
};
