export interface ILoggerStream {
    log(...args: any[]): void;
    error(...args: any[]): void;
    close(): void;
}