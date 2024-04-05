import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it('render button', ()=> {
    render(<Button />);
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })
  
});
