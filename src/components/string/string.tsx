import React, {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

type TArray = {
  value: string;
  color: ElementStates;
};

const reverseElement = async (
  arr: TArray[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArrElements: Dispatch<SetStateAction<TArray[]>>
) => {
  setArrElements([...arr])
  await delay(DELAY_IN_MS)
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
      await delay(DELAY_IN_MS);
      arr[start - 1].color = ElementStates.Modified;
      arr[end + 1].color = ElementStates.Modified;
      setArrElements([...arr])
    }  else {
      await delay(DELAY_IN_MS);
      return 
    }
    
  }
  setLoader(false);
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [loader, setLoader] = useState<boolean>(false);

  const [arrElements, setArrElements] = useState<TArray[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleButton();
  };

  const handleButton = () => {
    const arr = Array.from(inputValue).map((value) => ({
      value,
      color: ElementStates.Default,
    }));
    reverseElement(arr, setLoader, setArrElements);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={inputValue}
            onChange={onChange}
          ></Input>
          <Button
            text={`Развернуть`}
            type="submit"
            disabled={inputValue === ""}
            isLoader={loader}
          ></Button>
        </div>
        <ul className={styles.circles}>
          {arrElements &&
            arrElements.map((item, index) => {
              return (
                <li key={index} className={styles.circle}>
                  <Circle letter={item.value} state={item.color} />
                </li>
              );
            })}
        </ul>
      </form>
    </SolutionLayout>
  );
};
