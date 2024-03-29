export type TArr = Array<number>;

export const getFibonacciNumbers = (number: number): TArr => {
  const numItem = (i: number, arr: TArr) => {
    if (i < 2) {
      return 1;
    } else {
      return arr[i - 2] + arr[i - 1];
    }
  };
  let arr: TArr = [];
  for (let i = 0; i <= number; i++) {
    arr.push(numItem(i, arr));
  }
  return arr
};
