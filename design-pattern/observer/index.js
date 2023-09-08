// Subject (Đối tượng mà các observers muốn theo dõi)
class Subject {
  constructor() {
    this.observers = [];
  }
  register(observer) {
    this.observers.push(observer);
  }
  unregister(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(message) {
    this.observers.forEach((observer) => observer.update(message));
  }
}

// Observer (Người quan sát)
class Observer {
  update(message) {
    console.log(`Received message: ${message}`);
  }
}

// Sử dụng
const subject = new Subject();

const observer1 = new Observer();
const observer2 = new Observer();
subject.register(observer1);
subject.register(observer2);

subject.notify("Hello World!");

// Output:
// Received message: Hello World!
// Received message: Hello World!



const observers = [];

const Observable = Object.freeze({
  notify: (data) => observers.forEach((observer) => observer(data)),
  subscribe: (func) => observers.push(func),
  unsubscribe: (func) => {
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});

function logger(data) {
    console.log(`${Date.now()} ${data}`);
  }
  
Observable.subscribe(logger);