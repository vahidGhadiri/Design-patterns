/**
 * let's consider a scenario where we have a system that processes different types of payment methods.
 *  Each payment method has a different way of processing payments, 
 * and we need a factory to create the appropriate payment process
 * 
 * Dependency Injection: The factory can be extended to use dependency injection, allowing more complex initialization of objects.
 * Configuration Driven: The factory can read configuration from external sources to determine which classes to instantiate.
 * Prototype Pattern Integration: Integrate with the Prototype Pattern to clone existing instances if the creation cost is high.
 */


// Interface and Concrete Classes
interface PaymentProcessor {
    processPayment(amount: number): void;
}

class CreditCardProcessor implements PaymentProcessor {
    processPayment(amount: number) {
        console.log(`Processing credit card payment of $${amount}`);
    }
}

class PayPalProcessor implements PaymentProcessor {
    processPayment(amount: number) {
        console.log(`Processing PayPal payment of $${amount}`);
    }
}

class BitcoinProcessor implements PaymentProcessor {
    processPayment(amount: number) {
        console.log(`Processing Bitcoin payment of $${amount}`);
    }
}

// Factory Class with Registration Mechanism
class PaymentProcessorFactory {
    private static processors: Map<string, new () => PaymentProcessor> = new Map();

    static registerProcessor(type: string, processor: new () => PaymentProcessor) {
        this.processors.set(type, processor);
    }

    static createProcessor(type: string): PaymentProcessor {
        const processor = this.processors.get(type);
        if (!processor) {
            throw new Error("Unknown payment processor type");
        }
        return new processor();
    }
}

// Register processors
PaymentProcessorFactory.registerProcessor("creditCard", CreditCardProcessor);
PaymentProcessorFactory.registerProcessor("paypal", PayPalProcessor);
PaymentProcessorFactory.registerProcessor("bitcoin", BitcoinProcessor);


// Usage 
const creditCardProcessor = PaymentProcessorFactory.createProcessor("creditCard");
creditCardProcessor.processPayment(100); // Processing credit card payment of $100

const payPalProcessor = PaymentProcessorFactory.createProcessor("paypal");
payPalProcessor.processPayment(200); // Processing PayPal payment of $200

const bitcoinProcessor = PaymentProcessorFactory.createProcessor("bitcoin");
bitcoinProcessor.processPayment(300); // Processing Bitcoin payment of $300
