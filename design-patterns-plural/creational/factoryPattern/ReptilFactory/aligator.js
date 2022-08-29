// object that contains every factory part class
let registeredPartFactories = {};

registeredPartFactories['tail'] = class TailFactory{
  constructor(props) {
    this.tailLength = props.tailLength;
  }
};
registeredPartFactories['torso'] = class TorsoFactory {
  constructor(props) {
    this.color = props.color;
  }
};
registeredPartFactories['head'] = class HeadFactory {
  constructor(props) {
    this.snoutLenth = props.snoutLenth;
  }
}; 

// Factory that executes each class depens on methods
class ReptilePartFactory {
  constructor(type, props) {
    return new registeredPartFactories[type](props);
  }
};

// creating our aligator
let alligator = {};
let alligatorProps = {
  tailLength : 2.5, 
  color: "green",
  snoutLenth: 1
};

alligator.tail  = new ReptilePartFactory("tail", alligatorProps); 
alligator.torso = new ReptilePartFactory("torso", alligatorProps);
alligator.head  = new ReptilePartFactory("head", alligatorProps);
console.log(alligator)