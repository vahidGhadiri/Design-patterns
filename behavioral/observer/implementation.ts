// Define the Observer interface
// This interface declares the `update` method that must be implemented by any observer.
// The method will be called to notify the observer of any changes in the subject.
interface Investor {
    update(stockSymbol: string, price: number): void;
}

// Define the Subject (Observable) interface
// This interface declares methods for registering, removing, and notifying observers.
// The subject will use these methods to manage its observers.
interface StockMarket {
    registerInvestor(investor: Investor): void;
    removeInvestor(investor: Investor): void;
    notifyInvestors(): void;
}

// Concrete Subject: Stock
// The Stock class implements the StockMarket interface. It maintains a list of investors (observers)
// and the stock prices. When a stock price changes, it notifies all registered investors.
class Stock implements StockMarket {
    // Array to hold the list of registered investors
    private investors: Investor[] = [];
    // Map to hold stock prices, keyed by stock symbol
    private stockPrices: Map<string, number> = new Map();

    // Register an investor to the stock market
    registerInvestor(investor: Investor): void {
        this.investors.push(investor);
    }

    // Remove an investor from the stock market
    removeInvestor(investor: Investor): void {
        const index = this.investors.indexOf(investor);
        if (index > -1) {
            this.investors.splice(index, 1);
        }
    }

    // Notify all registered investors of the updated stock prices
    notifyInvestors(): void {
        // Iterate over the stock prices and notify each investor
        this.stockPrices.forEach((price, stockSymbol) => {
            this.investors.forEach(investor => investor.update(stockSymbol, price));
        });
    }

    // Update the price of a stock and notify investors of the change
    setStockPrice(stockSymbol: string, price: number): void {
        this.stockPrices.set(stockSymbol, price);
        this.notifyInvestors();
    }
}

// Concrete Observer: Individual Investor
// The IndividualInvestor class implements the Investor interface. It represents an individual
// who receives updates about stock prices.
class IndividualInvestor implements Investor {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    // The update method is called when the stock price changes.
    // It logs the new stock price to the console.
    update(stockSymbol: string, price: number): void {
        console.log(`Investor ${this.name} notified: ${stockSymbol} is now $${price.toFixed(2)}`);
    }
}

// Concrete Observer: Investment Fund
// The InvestmentFund class implements the Investor interface. It represents an investment fund
// that receives updates about stock prices.
class InvestmentFund implements Investor {
    private fundName: string;

    constructor(fundName: string) {
        this.fundName = fundName;
    }

    // The update method is called when the stock price changes.
    // It logs the new stock price to the console.
    update(stockSymbol: string, price: number): void {
        console.log(`Investment Fund ${this.fundName} notified: ${stockSymbol} is now $${price.toFixed(2)}`);
    }
}

// Example usage
// Create a new Stock object, which will act as the subject in the Observer Pattern.
const stockMarket = new Stock();

// Create individual investors and an investment fund as observers.
const investor1 = new IndividualInvestor("Alice");
const investor2 = new IndividualInvestor("Bob");
const investmentFund = new InvestmentFund("Global Fund");

// Register the investors to the stock market.
stockMarket.registerInvestor(investor1);
stockMarket.registerInvestor(investor2);
stockMarket.registerInvestor(investmentFund);

// Set stock prices and notify investors of the changes.
// All registered investors will receive updates.
stockMarket.setStockPrice("AAPL", 150.25);
stockMarket.setStockPrice("GOOGL", 2750.30);

// Remove one investor (Bob) from the stock market.
stockMarket.removeInvestor(investor2);

// Set stock prices again and notify the remaining investors.
// Only Alice and the Global Fund will receive updates now.
stockMarket.setStockPrice("AAPL", 151.75);
stockMarket.setStockPrice("GOOGL", 2760.50);
