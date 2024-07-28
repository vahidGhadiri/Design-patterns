// Interface and Concrete Classes
interface Animal {
    speak(): void;
}

class Dog implements Animal {
    speak() {
        console.log("Woof!");
    }
}

class Cat implements Animal {
    speak() {
        console.log("Meow!");
    }
}

// Factory Class
class AnimalFactory {
    static createAnimal(type: string): Animal {
        if (type === "dog") {
            return new Dog();
        } else if (type === "cat") {
            return new Cat();
        } else {
            throw new Error("Unknown animal type");
        }
    }
}

// Usage
const dog = AnimalFactory.createAnimal("dog");
dog.speak(); // Woof!

const cat = AnimalFactory.createAnimal("cat");
cat.speak(); // Meow!