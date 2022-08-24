### Factory Pattern
Es un patron que se encarga de organizar la creacion de cosas

Mejora la lectura y reduce la redundancia, asi como usa abstraccion. Sigue el paradigma DRY.

En este ejemplo queremos tener las partes de un lagarto para juntarlas después, por lo que creamos una por una.

- Un ejemplo sin complicacion de un factory
    
    ```jsx
    class TailFactory {
      constructor(props) {
        this.tailLength = props.tailLength;
      }
    };
    
    class TorsoFactory {
      constructor(props) {
        this.color = props.color;
      }
    };
    
    class HeadFactory {
      constructor(props) {
        this.snoutLenth = props.snoutLenth;
      }
    };
    
    // tenemos una clase general para crear todo tipo de partes de reptil
    class ReptilePartFactory {
      constructor(type, props) {
        if(type === "tail")
          return new TailFactory(props.tail);
        if(type === "torso")
          return new TorsoFactory(props.torso);
        if(type === "head")
          return new HeadFactory(props.head);
      }
    };
    
    // para crear nuestro reptil hacemos llamados a esta fabrica de partes de reptiles
    let alligator = {};
    
    let alligatorProps = {
      tailLength : 2.5, 
      color: "green",
      snoutLenth: 1
    };
    
    //gets a tail from the tail factory
    alligator.tail  = new ReptilePartFactory("tail", alligatorProps); 
    
    //gets a torso from the torso factory
    alligator.torso = new ReptilePartFactory("torso", alligatorProps);
    
    //gets a head from the head factory
    alligator.head  = new ReptilePartFactory("head", alligatorProps);
    ```
    
- Refactoring the factory
    
    ```jsx
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
    /*
    {
      tail: TailFactory { tailLength: 2.5 },
      torso: TorsoFactory { color: 'green' },
      head: HeadFactory { snoutLenth: 1 }
    }
    */
    ```