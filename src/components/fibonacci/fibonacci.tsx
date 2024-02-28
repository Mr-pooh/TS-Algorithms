import React, {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
} from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

type TArr = Array<number>;

const numItem = (i: number, arr: TArr) => {
  if (i < 2) {
    return 1;
  } else {
    return arr[i - 2] + arr[i - 1];
  }
};

const funcFibonacci = async (
  number: number,
  setArrElements: Dispatch<SetStateAction<TArr>>
) => {
  let arr: TArr = [];
  for (let i = 0; i <= number; i++) {
    await delay(SHORT_DELAY_IN_MS);
    arr.push(numItem(i, arr));

    setArrElements([...arr]);
  }
};

export const FibonacciConponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>();

  const [loader, setLoader] = React.useState<boolean>(false);

  const [arrElements, setArrElements] = React.useState<TArr>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoader(true);
    handleClick();
  };

  const handleClick = () => {
    funcFibonacci(Number(inputValue), setArrElements).then(() =>
      setLoader(false)
    );
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.input}>
        <Input
          isLimitText={true}
          type="number"
          max={19}
          min={1}
          value={inputValue}
          onChange={onChange}
        ></Input>
        <Button
          text={`Развернуть`}
          type="submit"
          disabled={
            !inputValue || Number(inputValue) > 19 || Number(inputValue) < 1
          }
          isLoader={loader}
        ></Button>
      </div>
      <ul className={styles.circles}>
        {arrElements &&
          arrElements.map((item, index) => {
            return (
              <li key={index} className={styles.circle}>
                <Circle letter={`${item}`} index={index} />
              </li>
            );
          })}
      </ul>
    </form>
  );
};
