import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { reverseElement } from "./stringFunction";

describe("Reverse Func", () => {
  const arrOneElement = [{ value: 1, color: ElementStates.Default }];

  const arrEvenChar = [
    { value: "1", color: ElementStates.Default },
    { value: "2", color: ElementStates.Default },
    { value: "3", color: ElementStates.Default },
    { value: "4", color: ElementStates.Default },
  ];

  const reverseEvenChar = [
    { value: "4", color: ElementStates.Modified },
    { value: "3", color: ElementStates.Modified },
    { value: "2", color: ElementStates.Modified },
    { value: "1", color: ElementStates.Modified },
  ];

  const arrOddChar = [
    { value: "1", color: ElementStates.Default },
    { value: "2", color: ElementStates.Default },
    { value: "3", color: ElementStates.Default },
  ];

  const reverseOddChar = [
    { value: "3", color: ElementStates.Modified },
    { value: "2", color: ElementStates.Modified },
    { value: "1", color: ElementStates.Modified },
  ];

  const setLoaderMock = jest.fn();
  const setArrElementsMock = jest.fn();
  const delayMock = jest.fn();

  it("correct with even characters", async () => {
    await reverseElement(
      arrEvenChar,
      setLoaderMock,
      setArrElementsMock,
      delayMock,
      DELAY_IN_MS
    );
    expect(setArrElementsMock).toBeCalledWith(reverseEvenChar);
    expect(setLoaderMock).toBeCalledWith(true);
  });
  it("correct with odd characters", async()=> {
    await reverseElement(arrOddChar, setLoaderMock, setArrElementsMock, delayMock, DELAY_IN_MS)
    expect(setArrElementsMock).toBeCalledWith(reverseOddChar)
    expect(setLoaderMock).toBeCalledWith(true);
  });
  it("correct with one character", async ()=> {
    await reverseElement(arrOneElement, setLoaderMock,setArrElementsMock, delayMock, DELAY_IN_MS)
    expect(setArrElementsMock).toBeCalledWith(arrOneElement)
    expect(setLoaderMock).toBeCalledWith(true);
  })
  it("correct with emmpty arr", async ()=> {
    const arr = [];
    await reverseElement(arr, setLoaderMock, setArrElementsMock, delayMock, DELAY_IN_MS)
    expect(setArrElementsMock).toBeCalledWith(arr)
    expect(setLoaderMock).toBeCalledWith(true)
})
});
