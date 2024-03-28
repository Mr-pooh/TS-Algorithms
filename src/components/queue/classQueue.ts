interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead: () => number;
  getTail: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  peak: () => T | null;
}

export class classQueue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    if (this.length < this.size) {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  clear = (): void => {
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    this.container = [];
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;
}
