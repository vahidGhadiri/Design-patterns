// Define a mediator interface
interface Mediator {
    notify(sender: object, event: string): void;
}

// Implement a concrete mediator
class ConcreteMediator implements Mediator {
    private componentA: ComponentA;
    private componentB: ComponentB;

    constructor(componentA: ComponentA, componentB: ComponentB) {
        this.componentA = componentA;
        this.componentB = componentB;

        // Set the mediator for the components
        this.componentA.setMediator(this);
        this.componentB.setMediator(this);
    }

    notify(sender: object, event: string): void {
        if (sender === this.componentA && event === 'AEvent') {
            console.log('Mediator reacts on AEvent and triggers following operations:');
            this.componentB.doAction();
        } else if (sender === this.componentB && event === 'BEvent') {
            console.log('Mediator reacts on BEvent and triggers following operations:');
            this.componentA.doAction();
        }
    }
}

// Define a base component class
abstract class BaseComponent {
    protected mediator: Mediator;

    setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }

    abstract doAction(): void;
}

// Implement concrete components
class ComponentA extends BaseComponent {
    doAction(): void {
        console.log('ComponentA does action');
        this.mediator.notify(this, 'AEvent');
    }
}

class ComponentB extends BaseComponent {
    doAction(): void {
        console.log('ComponentB does action');
        this.mediator.notify(this, 'BEvent');
    }
}

// Client code
const componentA = new ComponentA();
const componentB = new ComponentB();

const mediator = new ConcreteMediator(componentA, componentB);

componentA.doAction();
componentB.doAction();
