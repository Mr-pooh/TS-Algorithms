interface IStack<T> {
  push: (item: T) => void;
  pop: () => T | null;
  change: () => T | null;
  getSize: () => number;
  getElements: () => T[];
}

export class StackClass<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): any => {
    if (this.container.length === 0) {
      return null;
    }
    this.container.pop();
  };

  change = (): T | null => {
    if (this.container.length === 0) {
      return null;
    }
    return this.container[this.container.length - 1];
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = (): number => this.container.length;

  getElements = (): T[] => this.container;
}
