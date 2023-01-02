import { ILoggerStream } from "../../core/handlers/logger.interface";

export class ConsoleLoggerSingleton implements ILoggerStream{
    private static instance: ConsoleLoggerSingleton;
    
    private constructor() {}

    public static getInstance() {
        if (ConsoleLoggerSingleton.instance) {
            return ConsoleLoggerSingleton.instance;
        }

        ConsoleLoggerSingleton.instance = new ConsoleLoggerSingleton();
        return ConsoleLoggerSingleton.instance;
    }

    log(...args: any[]): void {
        console.log(...args);
    }

    error(...args: any[]): void {
        console.log(...args)
    }

    close(): void {
        console.log('Done.')
    }
}