import { ElementStates } from "../../types/element-states";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface IClassesList<T> {
  append: (element: T) => void;
  _toArray: () => T[];
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, index: number) => void;
  _get: (index: number) => void;
  deleteByIndex: (index: number) => void;
  getArrWithColor: () => Array<{ value: T; color: ElementStates }>;
}

export class ClassesList<T> implements IClassesList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private appendFromArray(values: T[]) {
    values.forEach((value) => this.append(value));
  }

  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (elements?.length) {
      this.appendFromArray(elements);
    }
  }

  append(element: T) {
    const newNode = new Node(element);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }

  prepend(element: T) {
    const newNode = new Node(element);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      return this;
    }

    const currenNode = this.head;
    this.head = newNode;
    this.head.next = currenNode;
    this.size++;
  }

  deleteHead() {
    if (!this.head) return null;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }

    const currentHead = this.head;
    const newHead = currentHead.next;
    this.head = newHead;
    this.size--;
  }

  deleteTail() {
    if (!this.tail) return;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }

    let current = this.head;
    let newTail = null;
    while (current) {
      if (current.next) {
        newTail = current;
      }
      current = current.next;
    }
    this.tail = newTail;
    this.tail!.next = null;
    this.size--;
  }

  _get(index: number) {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      let counter = 0;
      let curr = this.head;
      while (counter !== index && curr) {
        curr = curr?.next;
        counter++;
      }
      return curr;
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let prev = null;
        let currIndex = 0;
        while (currIndex < index) {
          prev = curr;
          curr = curr!.next;
          currIndex++;
        }
        node.next = curr;
        if (prev) {
          prev.next = node;
        }
      }
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } 
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();
    else {
      let prev = this._get(index - 1);
      if (prev?.next) {
        let deletedNode = prev?.next;
        prev.next = deletedNode?.next;
        this.size--;
        return deletedNode;
      }
    }
  }

  listSize() {
    return this.size;
  }

  _toArray() {
    let curr = this.head;
    const res = [];

    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return [...res];
  }

  getArrWithColor() {
    return this._toArray().map((item) => ({
      value: item,
      color: ElementStates.Default,
    }));
  }
}
