export const testUrl = "http://localhost:3000";

const addDataTestIdOnName = (selectorName) => {
  return `[data-testid='${selectorName}']`;
};

export const testCircle = addDataTestIdOnName("circle");

export const testCircleContain = addDataTestIdOnName("circle-test");
export const testCircleTail = addDataTestIdOnName("circleTail");
export const testCircleHead = addDataTestIdOnName("circleHead");
export const testCircleLetter = addDataTestIdOnName("circleLetter");
export const testCircleIndex = addDataTestIdOnName("circleIndex");

export const buttonAddHeadList = addDataTestIdOnName("buttonAddHeadList");
export const buttonAddTailList = addDataTestIdOnName("buttonAddTailList");
export const buttonDeleteHeadList = addDataTestIdOnName("buttonDeleteHeadList");
export const buttonDeleteTailList = addDataTestIdOnName("buttonDeleteTailList");
export const buttonAddIndexList = addDataTestIdOnName("buttonAddIndexList");
export const buttonDeleteIndexList = addDataTestIdOnName("buttonDeleteIndexList");

export const testArrowElement = addDataTestIdOnName("arrowElement");
