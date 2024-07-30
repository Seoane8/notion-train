export class Optional<T> {

    constructor(private value: T | null) {
    }

    static of<T>(value: T): Optional<T> {
        return new Optional<T>(value);
    }

    static empty<T>(): Optional<T> {
        return new Optional<T>(null);
    }

    isPresent(): boolean {
        return this.value !== null;
    }

    isEmpty(): boolean {
        return this.value === null;
    }

    get(): T {
        if (this.value === null) {
            throw new Error("Value is not present");
        }
        return this.value;
    }

}
