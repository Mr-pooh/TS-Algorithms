import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FibonacciConponent } from "../fibonacci/fibonacci";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <FibonacciConponent />
    </SolutionLayout>
  );
};
