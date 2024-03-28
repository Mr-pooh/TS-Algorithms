import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Sorting } from "../sorting/sorting";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <Sorting />
    </SolutionLayout>
  );
};
