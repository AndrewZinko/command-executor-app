export class ConsoleLoggerSingleton {
    constructor() { }
    static getInstance() {
        if (ConsoleLoggerSingleton.instance) {
            return ConsoleLoggerSingleton.instance;
        }
        ConsoleLoggerSingleton.instance = new ConsoleLoggerSingleton();
        return ConsoleLoggerSingleton.instance;
    }
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.log(...args);
    }
    close() {
        console.log('Done.');
    }
}
