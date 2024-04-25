import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArray, reverseElement } from "./stringFunction";
import { MAX_LENGTH_MEDIUM } from "../../constants/constants";

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
    reverseElement(arr, setLoader, setArrElements, delay, DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <Input
            isLimitText={true}
            maxLength={MAX_LENGTH_MEDIUM}
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
