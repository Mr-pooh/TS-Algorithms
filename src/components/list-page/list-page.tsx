import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { List } from "../list/list";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <List />
    </SolutionLayout>
  );
};
