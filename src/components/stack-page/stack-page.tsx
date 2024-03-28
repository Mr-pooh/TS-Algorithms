import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "../stack/stack";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <Stack></Stack>
    </SolutionLayout>
  );
};
