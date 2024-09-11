# Command Design Pattern

The Command design pattern is a behavioral design pattern that turns a request or simple operation into an object. This encapsulates the request, allowing the system to parameterize methods, delay execution, queue commands, and support undoable operations. The pattern is particularly useful when implementing undo/redo functionalities, logging changes, or when actions need to be executed at different times.

## Key Concepts of the Command Pattern

- **Command**: This is the core object that encapsulates an action. It usually implements a common interface that defines the `execute()` method, which triggers the operation.
- **Receiver**: The object that actually performs the action when the command's `execute()` method is called. The receiver knows how to carry out the operation but is decoupled from the invoker.
- **Invoker**: The invoker initiates the command. It knows how to trigger the command, but it doesn’t know how the action is performed. The invoker can also keep a history of commands for undo/redo purposes.
- **Client**: The client is responsible for creating the command object and setting its receiver. It passes the command to the invoker.
- **Undo/Redo**: Since commands are objects, they can store the necessary state to undo/redo operations, allowing the pattern to be particularly useful in applications like text editors or transaction systems.

## Advantages of the Command Pattern

- **Decoupling**: The command pattern decouples the object that requests an operation (the invoker) from the object that performs it (the receiver). This allows each part of the system to change independently.
- **Undo/Redo Support**: Commands can be stored and replayed, allowing for support of undoable operations.
- **Macro Commands**: The pattern enables the composition of commands into sequences (macros) to execute multiple commands as a single action.
- **Parameterization of Methods**: Commands can be used to pass methods (requests) as objects, making it easy to delay or queue the execution.

## Example Use Cases

- **Text Editor**: In a text editor, each action (cut, copy, paste) can be represented as a command. Each command can also store the previous state of the text for undoing the action.
- **Home Automation**: In a smart home system, commands can be used to turn devices on/off. Each command represents an operation on a specific device, such as turning on the lights or adjusting the thermostat.
- **Job Queues**: In systems that need to queue jobs for later execution, each job can be modeled as a command, making it easy to schedule and manage tasks.

## Difference with Other Behavioral Patterns

### Strategy Pattern

- **Definition**: The Strategy pattern allows selecting an algorithm or behavior at runtime. Different strategies implement a common interface, and the client can choose one dynamically.
- **Characteristics**: Strategy patterns are focused on choosing an algorithm, while the Command pattern focuses on encapsulating operations.

### Chain of Responsibility Pattern

- **Definition**: The Chain of Responsibility pattern allows a request to be passed along a chain of handlers. Each handler decides whether to process the request or pass it to the next handler in the chain.
- **Characteristics**: Chain of Responsibility delegates requests through a series of handlers, whereas the Command pattern encapsulates an operation in a reusable object.

### Template Method Pattern

- **Definition**: The Template Method pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses.
- **Characteristics**: The Template Method focuses on defining an algorithm structure, while the Command pattern encapsulates operations into objects that can be managed independently.

## Summary

- **Focus**: The Command pattern focuses on encapsulating operations and actions, while Strategy and Template Method deal more with selecting or structuring algorithms.
- **Decoupling**: Command patterns decouple invokers and receivers, allowing for delayed or stored execution.
- **Undo/Redo**: Command patterns are ideal for supporting undoable actions, whereas other behavioral patterns may not inherently provide this support.
