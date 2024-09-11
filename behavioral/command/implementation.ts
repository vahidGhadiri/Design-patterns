// Command interface
interface Command {
    execute(): void;
    undo(): void;
}

// Receiver: Light
class Light {
    private isOn = false;

    on(): void {
        this.isOn = true;
        console.log('Light is ON');
    }

    off(): void {
        this.isOn = false;
        console.log('Light is OFF');
    }
}

// Receiver: Fan
class Fan {
    private isOn = false;

    on(): void {
        this.isOn = true;
        console.log('Fan is ON');
    }

    off(): void {
        this.isOn = false;
        console.log('Fan is OFF');
    }
}

// Concrete Command for Light
class LightOnCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.on();
    }

    undo(): void {
        this.light.off();
    }
}

class LightOffCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.off();
    }

    undo(): void {
        this.light.on();
    }
}

// Concrete Command for Fan
class FanOnCommand implements Command {
    private fan: Fan;

    constructor(fan: Fan) {
        this.fan = fan;
    }

    execute(): void {
        this.fan.on();
    }

    undo(): void {
        this.fan.off();
    }
}

class FanOffCommand implements Command {
    private fan: Fan;

    constructor(fan: Fan) {
        this.fan = fan;
    }

    execute(): void {
        this.fan.off();
    }

    undo(): void {
        this.fan.on();
    }
}

// Macro Command to execute multiple commands at once
class MacroCommand implements Command {
    private commands: Command[];

    constructor(commands: Command[]) {
        this.commands = commands;
    }

    execute(): void {
        this.commands.forEach(command => command.execute());
    }

    undo(): void {
        this.commands.reverse().forEach(command => command.undo());
    }
}

// Invoker class to handle commands
class RemoteControl {
    private history: Command[] = [];
    private undoStack: Command[] = [];

    executeCommand(command: Command): void {
        command.execute();
        this.history.push(command);
        this.undoStack = []; // Clear the undo stack when a new command is executed
    }

    undo(): void {
        if (this.history.length === 0) return;

        const lastCommand = this.history.pop()!;
        lastCommand.undo();
        this.undoStack.push(lastCommand);
    }

    redo(): void {
        if (this.undoStack.length === 0) return;

        const lastUndone = this.undoStack.pop()!;
        lastUndone.execute();
        this.history.push(lastUndone);
    }

    resetHistory(): void {
        this.history = [];
        this.undoStack = [];
    }
}

// Client code
const light = new Light();
const fan = new Fan();

const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);
const fanOnCommand = new FanOnCommand(fan);
const fanOffCommand = new FanOffCommand(fan);

const remote = new RemoteControl();

// Execute individual commands
remote.executeCommand(lightOnCommand);  // Light is ON
remote.executeCommand(fanOnCommand);    // Fan is ON

// Undo last command
remote.undo();                          // Fan is OFF
remote.undo();                          // Light is OFF

// Redo last command
remote.redo();                          // Light is ON

// Macro command (Turn both light and fan off)
const allOffCommand = new MacroCommand([lightOffCommand, fanOffCommand]);
remote.executeCommand(allOffCommand);   // Light is OFF, Fan is OFF

// Undo macro command
remote.undo();                          // Light is ON, Fan is ON

// Reset history
remote.resetHistory();
