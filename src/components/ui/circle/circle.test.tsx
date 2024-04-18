import { render, screen } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Circle', () => {
    it('render without letter', () => {
        render(<Circle />);
        const circle = screen.getByTestId('circle-test');
        expect(circle).toMatchSnapshot();
    });

    it('render with letter', () => {
        render(<Circle letter="3" />);
        const circle = screen.getByTestId('circle-test');
        expect(circle).toMatchSnapshot();
    });
    it('render with head', () => {
        render(<Circle head={'s'} />)
        const circle = screen.getByTestId('circle-test');
        expect(circle).toMatchSnapshot()
    })
    it('render element-react with head', ()=> {
        render(<Circle head={<div><p>sss1123</p></div>} />)
        const circle = screen.getByTestId('circle-test');
        expect(circle).toMatchSnapshot()
    })
    it('render with tail', ()=> {
        render(<Circle tail={'S'} />)
        const circle = screen.getByTestId('circle-test')
        expect(circle).toMatchSnapshot()
    })
    it('render element-react with tail', ()=> {
        render(<Circle tail={<div><p>sss1123</p></div>} />)
        const circle = screen.getByTestId('circle-test')
        expect(circle).toMatchSnapshot()
    })
    it('render with index', ()=> {
        render(<Circle index={2} />)
        const circle = screen.getByTestId('circle-test')
        expect(circle).toMatchSnapshot()
    })
    it('render with prop isSmall true', ()=> {
        render(<Circle isSmall={true} />)
        const circle = screen.getByTestId('circle-test')
        expect(circle).toMatchSnapshot()
    })
    it('render state default', ()=> {
        render(<Circle state={ElementStates.Default} />)
        const circle = screen.getByTestId('circle-test')
        expect(circle).toMatchSnapshot()
    })
    it('render state changing', ()=> {
        render(<Circle state={ElementStates.Changing} />)
        const circle = screen.getByTestId('circle-test')
        expect(circle).toMatchSnapshot()
    })
    it('render state modified', ()=> {
        render(<Circle state={ElementStates.Modified} />)
        const circle = screen.getByTestId('circle-test')
        expect(circle).toMatchSnapshot()
    })
});