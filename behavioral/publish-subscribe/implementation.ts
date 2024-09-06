// Define the basic structure for the events
interface Subscriber {
    id: string;
    callback: (message: any) => void;
}

interface MessageBroker {
    subscribe(topic: string, callback: (message: any) => void): string;
    unsubscribe(topic: string, subscriberId: string): void;
    publish(topic: string, message: any): void;
}

class PubSub implements MessageBroker {
    // A map to store topics and their corresponding subscribers
    private topics: Map<string, Subscriber[]> = new Map();

    // Unique id generator for subscribers
    private generateSubscriberId(): string {
        return `${new Date().getTime()}-${Math.random()}`;
    }

    // Subscribe to a specific topic
    public subscribe(topic: string, callback: (message: any) => void): string {
        const id = this.generateSubscriberId();
        const subscriber: Subscriber = { id, callback };

        // Add subscriber to the topic
        if (!this.topics.has(topic)) {
            this.topics.set(topic, []);
        }
        this.topics.get(topic)?.push(subscriber);

        return id; // Return the subscriber id for future unsubscription
    }

    // Unsubscribe a subscriber from a specific topic
    public unsubscribe(topic: string, subscriberId: string): void {
        const subscribers = this.topics.get(topic);
        if (subscribers) {
            this.topics.set(
                topic,
                subscribers.filter(sub => sub.id !== subscriberId)
            );
        }
    }

    // Publish a message to a specific topic
    public publish(topic: string, message: any): void {
        const subscribers = this.topics.get(topic);

        if (subscribers && subscribers.length > 0) {
            subscribers.forEach(sub => {
                try {
                    sub.callback(message); // Deliver the message to each subscriber
                } catch (error) {
                    console.error(`Error delivering message to subscriber ${sub.id}`, error);
                }
            });
        }
    }
}

// Usage Example

// Initialize the pub/sub system
const pubsub = new PubSub();

// Subscriber 1 subscribing to 'news' topic
const subscriberId1 = pubsub.subscribe('news', (message) => {
    console.log(`Subscriber 1 received news: ${message}`);
});

// Subscriber 2 subscribing to 'news' topic
const subscriberId2 = pubsub.subscribe('news', (message) => {
    console.log(`Subscriber 2 received news: ${message}`);
});

// Subscriber 3 subscribing to 'sports' topic
const subscriberId3 = pubsub.subscribe('sports', (message) => {
    console.log(`Subscriber 3 received sports: ${message}`);
});

// Publish a message to 'news' topic
pubsub.publish('news', 'Breaking news: Market is up!');

// Publish a message to 'sports' topic
pubsub.publish('sports', 'Live update: Football match in progress');

// Unsubscribe subscriber 1 from 'news'
pubsub.unsubscribe('news', subscriberId1);

// Publish another message to 'news' topic
pubsub.publish('news', 'Update: Market is stable now.');
