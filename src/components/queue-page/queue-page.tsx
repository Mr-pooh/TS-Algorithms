import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "../queue/queue";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <Queue />
    </SolutionLayout>
  );
};
