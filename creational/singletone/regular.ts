class Singleton {
    private static instance: Singleton;
    // Private constructor to prevent direct instantiation
    private constructor() { }
    // Method to get the single instance
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public doSomething(): void {
        console.log("Singleton instance is doing something.");
    }
}

// Usage
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

singleton1.doSomething(); // Singleton instance is doing something.

console.log(singleton1 === singleton2); // true
