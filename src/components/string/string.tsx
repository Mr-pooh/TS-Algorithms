import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './string.module.css'
export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <form className={style.form}>
        <Input isLimitText={true} maxLength={11}></Input>
        <Button text={`Развернуть`} ></Button>
      </form>
    </SolutionLayout>
  );
};
