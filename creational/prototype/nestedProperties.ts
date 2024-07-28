interface Prototype {
    clone(): Prototype
}

class Address implements Prototype {
    constructor(public street: string, public city: string) { }

    clone(): this {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}

class User implements Prototype {
    public address: Address
    constructor(public name: string, public age: number, address: Address) {
        this.address = address
    }

    clone(): this {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        clone.address = this.address.clone()
        return clone
    }
}


const originalAddress = new Address("Ekbatan-town", "Tehran");
const originalUser = new User("Vahid Ghadiri", 32, originalAddress);

const clonedUser = originalUser.clone();

console.log(originalUser)