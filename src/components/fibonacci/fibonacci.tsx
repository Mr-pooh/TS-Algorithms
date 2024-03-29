import React, { ChangeEvent, FormEventHandler } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { getFibonacciNumbers } from "./getFibonacciNumbers";
import { MAX_LENGTH_LARGE, MIN_LENGTH_SMALL } from "../../constants/constants";
import { ElementStates } from "../../types/element-states";

type TElem = {
  value: number;
  color: ElementStates;
}

export const FibonacciConponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const [loader, setLoader] = React.useState<boolean>(false);

  const [arrElements, setArrElements] = React.useState<TElem[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleClick();
  };

  const handleClick = async () => {
    setLoader(true);
    const arr = [...getFibonacciNumbers(Number(inputValue))]
    const renderingFib: TElem[] = []
    for(let i = 0; i < arr.length; i++){
      await delay(SHORT_DELAY_IN_MS);
      renderingFib.push({value: arr[i], color: ElementStates.Default})
      setArrElements([...renderingFib])
      
    }
    
    setLoader(false);
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
            !inputValue ||
            Number(inputValue) > MAX_LENGTH_LARGE ||
            Number(inputValue) < MIN_LENGTH_SMALL
          }
          isLoader={loader}
        ></Button>
      </div>
      <ul className={styles.circles}>
        {arrElements &&
          arrElements.map((item, index) => {
            return (
              <li key={index} className={styles.circle}>
                <Circle letter={`${item.value}`} state={item.color} index={index} />
              </li>
            );
          })}
      </ul>
    </form>
  );
};
