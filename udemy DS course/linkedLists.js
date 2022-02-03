// make a node for linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let newNode = new Node(val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // MY TRIAL OF POP METHOD
  // pop() {
  //   if (!this.head) return undefined;
  //   let counter = 1;
  //   let current = this.head;
  //   let nodeRemovedValue;
  //   if (this.length === 1) {
  //     nodeRemovedValue = this.head;
  //     this.head = null;
  //     this.tail = null;
  //     this.length--;
  //   }
  //   while (counter < this.length && current) {
  //     if (counter === this.length - 1) {
  //       nodeRemovedValue = current.next;
  //       current.next = null;
  //       this.tail = current;
  //       this.length--;
  //     }
  //     current = current.next;
  //     counter++;
  //   }
  //   return nodeRemovedValue;
  // }

  //COURSE POP METHOD
  pop() {
    if (!this.head) return undefined;
    let removedTail = this.head;
    let newTail = removedTail;
    while (removedTail.next) {
      newTail = removedTail;
      removedTail = removedTail.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return removedTail;
  }

  // MY TRIAL OF SHIFT METHOD
  // shift() {
  //   let nodeRemovedValue;
  //   if (this.length === 1) {
  //     nodeRemovedValue = this.head;
  //     this.head = null;
  //     this.tail = null;
  //     this.length--;
  //   } else if (this.length === 0) {
  //     return undefined;
  //   } else {
  //     nodeRemovedValue = this.head;
  //     this.head = this.head.next;
  //     this.length--;
  //   }
  //   return nodeRemovedValue;
  // }

  //COURSE SHIFT METHOD
  shift() {
    if (!this.head) return undefined;
    let removedHead = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return removedHead;
  }

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter != index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  set(index, value) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = value;
      return true;
    }
    return false;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === this.length) {
      return !!this.push(value);
    } else if (index === 0) {
      return !!this.unshift(value);
    } else {
      let newNode = new Node(value);
      let prev = this.get(index - 1);
      let temp = prev.next;
      prev.next = newNode;
      newNode.next = temp;
      this.length++;
      return true;
    }
  }

  remove(index) {
    if (index < 0 || index > this.length) return undefined;
    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();
    let removedNode = this.get(index);
    let prev = this.get(index - 1);
    let next = removedNode.next;
    prev.next = next;
    this.length--;
    return true;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next = null;
    let prev = null;
    for (let i = 0; i < this.length; i++) {}
  }
}

list = new SinglyLinkedList();
console.log("1", list);
list.unshift("hello");
console.log("3", list);
list.unshift("GOODBYE");
list.unshift("!");
console.log("2", list);
console.log(list.get(1));
// console.log("1", list);
// console.log(list.shift());
// console.log("2", list);
// console.log(list.shift());
// console.log(list.shift());
// console.log(list.shift());
