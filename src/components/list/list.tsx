import React, { ChangeEvent, useMemo, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list.module.css";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { ClassesList } from "./classesList";
import { LENGTH_MEDIUM, MAX_LENGTH_SHORT, MAX_LENGTH_SMALL, MIN_LENGTH_SHORT } from "../../constants/constants";

type TItem = {
  value: string;
  color: ElementStates;
};

enum ButtonName {
  AddToHead = "add to head",
  AddToTail = "add to tail",
  DeleteFromTheHead = "delete from the head",
  DeleteFromTheTail = "delete from to tail",
  AddByIndex = "add by index",
  DeleteByIndex = "delete by index",
}

export const List: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [ind, setInd] = useState("");
  const [loading, setLoading] = useState(false);
  const [addToHeadOperation, setAddToHeadOperation] = useState(false);
  const [addToTailOperation, setAddToTailOperation] = useState(false);
  const [deleteFromTheHeadOperation, setDeleteFromTheHeadOperation] =
    useState(false);
  const [deleteFromTheTailOperation, setDeleteFromTheTailOperation] =
    useState(false);
  const [addByIndexOperation, setAddByIndexOperation] = useState(false);
  const [deleteByIndexOperation, setDeleteByIndexOperation] = useState(false);
  const [inputValueInd, setInputValueInd] = useState<number>();
  const [buttonName, setButtonName] = useState("");
  const [circleTempValue, setCircleTempValue] = useState("");

  const list = useMemo(
    () =>
      new ClassesList<string>(
        Array.from({ length: MAX_LENGTH_SHORT }, () =>
          Math.floor(Math.random() * 100).toString()
        )
      ),
    []
  );

  const [arr, setArr] = useState<TItem[]>(list.getArrWithColor());

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onIndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInd(e.target.value);
  };

  const addIntoHead = async () => {
    if (inputValue && list.listSize() < LENGTH_MEDIUM) {
      setButtonName(ButtonName.AddToHead);
      setLoading(true);
      setInputValueInd(0);
      setAddToHeadOperation(true);
      await delay(SHORT_DELAY_IN_MS);
      list.prepend(inputValue);
      setAddToHeadOperation(false);
      const newArr = list.getArrWithColor();
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      newArr[0].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
    setButtonName("");
  };

  const addIntoTail = async () => {
    if (inputValue && list.listSize() < LENGTH_MEDIUM) {
      setButtonName(ButtonName.AddToTail);
      setLoading(true);
      setInputValueInd(list.listSize() - 1);
      setAddToTailOperation(true);
      await delay(SHORT_DELAY_IN_MS);
      list.append(inputValue);
      setAddToTailOperation(false);
      const newArr = list.getArrWithColor();
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
    setButtonName("");
  };

  const deleteFromTheHead = async () => {
    if (list.listSize() > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[0].value);
      setButtonName(ButtonName.DeleteFromTheHead);
      setLoading(true);
      setDeleteFromTheHeadOperation(true);
      setInputValueInd(0);
      newArr[0].value = "";
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      list.deleteHead();
      setDeleteFromTheHeadOperation(false);
      setArr(list.getArrWithColor());
    }
    setLoading(false);
    setButtonName("");
  };

  const deleteFromTheTail = async () => {
    if (list.listSize() > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[newArr.length - 1].value);
      setButtonName(ButtonName.DeleteFromTheTail);
      setLoading(true);
      setDeleteFromTheTailOperation(true);
      setInputValueInd(list.listSize() - 1);
      newArr[newArr.length - 1].value = "";
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      list.deleteTail();
      setDeleteFromTheTailOperation(false);
      setArr(list.getArrWithColor());
    }
    setLoading(false);
    setButtonName("");
  };

  const addByIndex = async () => {
    if (Number(ind) < 5 && list.listSize() < 6) {
      setButtonName(ButtonName.AddByIndex);
      setLoading(true);
      setAddByIndexOperation(true);
      const newArr = list.getArrWithColor();
      for (let i = 0; i <= Number(ind); i++) {
        setInputValueInd(i);
        await delay(SHORT_DELAY_IN_MS);
        if (i < Number(ind)) {
          newArr[i].color = ElementStates.Changing;
          setArr(newArr);
        }
      }
      setAddByIndexOperation(false);
      setInputValueInd(Number(""));
      list.addByIndex(inputValue, Number(ind));
      const finalArr = list.getArrWithColor();
      finalArr[Number(ind)].color = ElementStates.Modified;

      setArr(finalArr);
      await delay(SHORT_DELAY_IN_MS);
      finalArr[Number(ind)].color = ElementStates.Default;
      setArr(finalArr);
    }
    setLoading(false);
    setInputValue("");
    setInd("");
    setButtonName("");
  };

  const deleteByIndex = async () => {
    if (Number(ind) < list.listSize() && Number(ind) < 7) {
      setButtonName(ButtonName.DeleteByIndex);
      setLoading(true);
      const newArr = list.getArrWithColor();
      for (let i = 0; i <= Number(ind); i++) {
        await delay(SHORT_DELAY_IN_MS);
        newArr[i].color = ElementStates.Changing;
        setArr([...newArr]);
      }
      await delay(SHORT_DELAY_IN_MS);
      setCircleTempValue(newArr[Number(ind)].value);
      newArr[Number(ind)].value = "";
      setDeleteByIndexOperation(true);
      newArr[Number(ind)].color = ElementStates.Default;
      setInputValueInd(Number(ind));
      await delay(SHORT_DELAY_IN_MS);
      list.deleteByIndex(Number(ind));
      setArr(list.getArrWithColor());
      setDeleteByIndexOperation(false);
      setLoading(false);
      setButtonName("");
      setInd("");
    }
  };

  const showHead = (index: number) => {
    if (index === 0 && !addToHeadOperation && !addByIndexOperation) {
      return "head";
    } else {
      return "";
    }
  };

  const showTail = (index: number) => {
    if (
      index === arr.length - 1 &&
      !deleteFromTheTailOperation &&
      !deleteByIndexOperation
    ) {
      return "tail";
    } else {
      return "";
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.controlContainer}>
        <section className={styles.section}>
          <Input
            placeholder="Введите значение"
            maxLength={MAX_LENGTH_SHORT}
            isLimitText={true}
            value={inputValue}
            onChange={onInputChange}
            disabled={loading}
          />
          <div className={styles.button}>
            <Button
              text="Добавить в head"
              onClick={addIntoHead}
              isLoader={buttonName === ButtonName.AddToHead && loading}
              disabled={inputValue === "" || loading}
            />
          </div>
          <div className={styles.button}>
            <Button
              text="Добавить в tail"
              onClick={addIntoTail}
              isLoader={buttonName === ButtonName.AddToTail && loading}
              disabled={inputValue === "" || loading}
            />
          </div>
          <div className={styles.button}>
            <Button
              text="Удалить из head"
              onClick={deleteFromTheHead}
              isLoader={buttonName === ButtonName.DeleteFromTheHead && loading}
              disabled={loading}
            />
          </div>
          <div className={styles.button}>
            <Button
              text="Удалить из tail"
              onClick={deleteFromTheTail}
              isLoader={buttonName === ButtonName.DeleteFromTheTail && loading}
              disabled={loading}
            />
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.input}>
            <Input
              placeholder="Введите индекс"
              max={MAX_LENGTH_SMALL}
              min={MIN_LENGTH_SHORT}
              type="number"
              value={ind}
              onChange={onIndChange}
              disabled={loading}
            />
          </div>
          <Button
            text="Добавить по индексу"
            onClick={addByIndex}
            isLoader={buttonName === ButtonName.AddByIndex && loading}
            disabled={!inputValue || !ind || loading || Number(ind) > list.listSize() }
          />
          <Button
            text="Удалить по индексу"
            onClick={deleteByIndex}
            isLoader={buttonName === ButtonName.DeleteByIndex && loading}
            disabled={ind === "" || loading || Number(ind) > list.listSize()-1 }
          />
        </section>
      </div>
      <ul className={styles.circlesBox}>
        {arr.map((item, index) => (
          <li className={styles.circleCont} key={index}>
            {loading &&
              (addToHeadOperation ||
                addToTailOperation ||
                addByIndexOperation) &&
              index === inputValueInd && (
                <div className={styles.smallCircleTop}>
                  <Circle
                    isSmall
                    letter={inputValue}
                    state={ElementStates.Changing}
                  />
                </div>
              )}
            {loading &&
              (deleteFromTheHeadOperation ||
                deleteFromTheTailOperation ||
                deleteByIndexOperation) &&
              index === inputValueInd && (
                <div className={styles.smallCircleBottom}>
                  <Circle
                    isSmall
                    letter={circleTempValue}
                    state={ElementStates.Changing}
                  />
                </div>
              )}
            {arr.length - 1 !== index && (
              <div className={styles.arrow}>
                <ArrowIcon />
              </div>
            )}
            <div className={styles.bigCircle}>
              <Circle
                index={index}
                head={showHead(index)}
                tail={showTail(index)}
                letter={item.value}
                state={item.color}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
