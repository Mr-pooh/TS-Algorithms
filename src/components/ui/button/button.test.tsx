import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it('render with text', ()=> {
    render(<Button text={'text'} />)
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })
  it('render without text', ()=> {
    render(<Button />);
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })
  it('rennder disable', ()=> {
    render(<Button disabled />);
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })
  it('render loader', ()=> {
    render(<Button isLoader={true} />)
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })
});
