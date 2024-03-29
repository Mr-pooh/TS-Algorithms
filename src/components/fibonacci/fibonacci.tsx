import React, { ChangeEvent, FormEventHandler } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { TArr, funcFibonacci } from "./fibonacciFunction";
import { MAX_LENGTH_LARGE, MIN_LENGTH_SMALL } from "../../constants/constants";

export const FibonacciConponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");

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
    funcFibonacci(
      Number(inputValue),
      setArrElements,
      delay,
      SHORT_DELAY_IN_MS
    ).then(() => setLoader(false));
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.input}>
        <Input
          isLimitText={true}
          type="number"
          max={MAX_LENGTH_LARGE}
          min={MIN_LENGTH_SMALL}
          value={inputValue}
          onChange={onChange}
        ></Input>
        <Button
          text={`Развернуть`}
          type="submit"
          disabled={
            !inputValue || Number(inputValue) > MAX_LENGTH_LARGE || Number(inputValue) < MIN_LENGTH_SMALL
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
