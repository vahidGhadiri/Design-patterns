// Define a type for event handlers
type EventHandler<T> = (eventData: T) => void | Promise<void>;

// EventBus class with generic types
class EventBus {
    private handlers: Map<string, Set<EventHandler<any>>> = new Map();

    // Subscribe to a specific event type with a specific event data type
    public subscribe<T>(eventType: string, handler: EventHandler<T>): void {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, new Set());
        }
        this.handlers.get(eventType)?.add(handler as EventHandler<any>);
    }

    // Unsubscribe from a specific event type with a specific event data type
    public unsubscribe<T>(eventType: string, handler: EventHandler<T>): void {
        this.handlers.get(eventType)?.delete(handler as EventHandler<any>);
    }

    // Publish an event asynchronously
    public async publish<T>(eventType: string, eventData: T): Promise<void> {
        const handlers = this.handlers.get(eventType);
        if (handlers) {
            const promises = [...handlers].map(handler => handler(eventData as any));
            await Promise.all(promises); // Wait for all handlers to finish
        }
    }

    // Publish an event synchronously
    public publishSync<T>(eventType: string, eventData: T): void {
        const handlers = this.handlers.get(eventType);
        if (handlers) {
            handlers.forEach(handler => handler(eventData as any));
        }
    }
}

// Example Usage:

// Define a custom event type and event data structure
interface OrderEvent {
    orderId: number;
    customerName: string;
}

// Create an instance of the EventBus
const eventBus = new EventBus();

// Register a subscriber for 'orderCreated' events
eventBus.subscribe<OrderEvent>('orderCreated', (eventData) => {
    console.log(`Order Created: ${eventData.orderId} by ${eventData.customerName}`);
});

// Register another subscriber for 'orderCreated' events (async handler)
eventBus.subscribe<OrderEvent>('orderCreated', async (eventData) => {
    console.log(`Processing order asynchronously: ${eventData.orderId}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
    console.log(`Order processed: ${eventData.orderId}`);
});

// Publish an 'orderCreated' event
eventBus.publish<OrderEvent>('orderCreated', {
    orderId: 123,
    customerName: 'John Doe'
});

// Synchronous example
eventBus.publishSync<OrderEvent>('orderCreated', {
    orderId: 456,
    customerName: 'Jane Smith'
});
