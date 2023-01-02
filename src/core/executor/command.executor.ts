import { ChildProcessWithoutNullStreams } from "child_process";
import { ILoggerStream } from "../handlers/logger.interface";
import { ICommandExecution } from "./command.types";

export abstract class CommandExecutor<Input> {
    constructor(private logger: ILoggerStream) {}

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): ICommandExecution;
    protected abstract spawn(command: ICommandExecution): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: ILoggerStream): void;

    public async execute() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger);
    }
}