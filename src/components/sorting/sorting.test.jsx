import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sortSelection, sortingBuble } from "./sortingFunctions";

describe("Sorting", () => {
  const arrOneElement = [{ value: 1, color: ElementStates.Default }];
  const arrEvenChar = [
    { value: 73, color: ElementStates.Default },
    { value: 21, color: ElementStates.Default },
    { value: 53, color: ElementStates.Default },
    { value: 0, color: ElementStates.Default },
  ];
  const sortedArrEvenCharAsc = [
    { value: 0, color: ElementStates.Modified },
    { value: 21, color: ElementStates.Modified },
    { value: 53, color: ElementStates.Modified },
    { value: 73, color: ElementStates.Modified },
  ];
  const sortedArrEvenCharDesc = [
    { value: 73, color: ElementStates.Modified },
    { value: 53, color: ElementStates.Modified },
    { value: 21, color: ElementStates.Modified },
    { value: 0, color: ElementStates.Modified },
  ];
  const setLoaderMock = jest.fn();
  const setArrMock = jest.fn();
  const delayMock = jest.fn();

  it("correct Selection in even character ascending", async () => {
    await sortSelection(
      arrEvenChar,
      setArrMock,
      setLoaderMock,
      Direction.Ascending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledWith(sortedArrEvenCharAsc);
    expect(setLoaderMock).toBeCalledWith(false);
  });

  it("correct Selection in even character descending", async () => {
    await sortSelection(
      arrEvenChar,
      setArrMock,
      setLoaderMock,
      Direction.Descending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledWith(sortedArrEvenCharDesc);
    expect(setLoaderMock).toBeCalledWith(false);
  });

  it("correct Selection with one element", async () => {
    await sortSelection(
      arrOneElement,
      setArrMock,
      setLoaderMock,
      Direction.Ascending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledTimes(0);
    expect(setLoaderMock).toBeCalledWith(false);
  });
  it("correct Selection with empty arr", async () => {
    await sortSelection(
      [],
      setArrMock,
      setLoaderMock,
      Direction.Ascending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledTimes(0);
    expect(setLoaderMock).toBeCalledWith(false);
  });
  it("correct Bubble in even character ascending", async () => {
    await sortingBuble(
      arrEvenChar,
      setArrMock,
      setLoaderMock,
      Direction.Ascending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledWith(sortedArrEvenCharAsc);
    expect(setLoaderMock).toBeCalledWith(false);
  });

  it("correct Bubble in even character descending", async () => {
    await sortingBuble(
      arrEvenChar,
      setArrMock,
      setLoaderMock,
      Direction.Descending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledWith(sortedArrEvenCharDesc);
    expect(setLoaderMock).toBeCalledWith(false);
  });

  it("correct Bubble with one element", async () => {
    await sortingBuble(
      arrOneElement,
      setArrMock,
      setLoaderMock,
      Direction.Ascending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledTimes(0);
    expect(setLoaderMock).toBeCalledWith(false);
  });
  it("correct Bubble with empty arr", async () => {
    await sortingBuble(
      [],
      setArrMock,
      setLoaderMock,
      Direction.Ascending,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrMock).toBeCalledTimes(0);
    expect(setLoaderMock).toBeCalledWith(false);
  });
});
