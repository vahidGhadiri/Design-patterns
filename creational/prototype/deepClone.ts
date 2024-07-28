interface Prototype<T> {
    clone(): T;
}

class DeepClone<T> implements Prototype<T> {
    private object: T;

    constructor(object: T) {
        this.object = object;
    }

    clone(): T {
        return this.deepClone(this.object) as T;
    }

    private deepClone<U>(obj: U): U {
        // Handle primitive types and functions
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            return new Date(obj.getTime()) as U;
        }

        // Handle Array
        if (Array.isArray(obj)) {
            const arrCopy: any[] = [];
            for (const item of obj) {
                arrCopy.push(this.deepClone(item));
            }
            return arrCopy as U;
        }

        // Handle Object
        if (obj instanceof Object) {
            const objCopy: { [key: string]: any } = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    objCopy[key] = this.deepClone(obj[key]);
                }
            }
            return objCopy as U;
        }

        throw new Error('Unable to copy object! Its type isn’t supported.');
    }
}

// Usage
const originalObject = {
    name: "John",
    age: 30,
    address: {
        street: "123 Main St",
        city: "Springfield",
        meta: {
            created: new Date(),
            tags: ["home", "primary"]
        }
    },
    hobbies: ["reading", "gaming"],
    nestedArray: [{ id: 1 }, { id: 2 }]
};

const deepCloneInstance = new DeepClone<typeof originalObject>(originalObject);
const clonedObject = deepCloneInstance.clone();

clonedObject.name = "Jane";
clonedObject.address.street = "456 Elm St";
clonedObject.address.meta.tags.push("updated");
clonedObject.hobbies.push("sports");
clonedObject.nestedArray[0].id = 99;

console.log(originalObject);
console.log(clonedObject);
