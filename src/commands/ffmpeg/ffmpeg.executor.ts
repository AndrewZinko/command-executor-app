import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor.js";
import { FileService } from "../../core/files/files.service.js";
import { HandlersStream } from "../../core/handlers/handlers.stream.js";
import { ILoggerStream } from '../../core/handlers/logger.interface';
import { PromptService } from "../../core/prompt/prompt.service.js";
import { ConsoleLoggerSingleton } from "../../out/console-logger/console-logger.singleton.js";
import { FFmpegBuilder } from "./ffmpeg.builder.js";
import { FFmpegInput, IFFmpegCommandExecution } from "./ffmpeg.types.js";
 
export class FFmpegExecutor extends CommandExecutor<FFmpegInput>{
    private promptService: PromptService = new PromptService();
    private fileService: FileService = new FileService();
        
    constructor(logger: ILoggerStream) {
        super(logger);
    }

    protected async prompt(): Promise<FFmpegInput> {
        const inputPath = await this.promptService.input<string>('Path to file: ', 'input');
        const resolutionWidth = await this.promptService.input<number>('Video width: ', 'number');
        const resolutionHeigth = await this.promptService.input<number>('Video heigth: ', 'number');
        const fileName = await this.promptService.input<string>('File name: ', 'input');

        return {
            inputPath,
            resolutionWidth,
            resolutionHeigth,
            fileName
        };
    }

    protected build({inputPath, resolutionWidth, resolutionHeigth, fileName}: FFmpegInput): IFFmpegCommandExecution {
        const outputPath = this.fileService.getFilePath(inputPath, fileName, 'mp4');

        const {command, options} = new FFmpegBuilder()
                                .setInputPath(inputPath)
                                .setResolution(resolutionWidth, resolutionHeigth)
                                .setOutputPath(outputPath)
                                .build();

        return {
            command,
            options,
            outputPath
        };
    }

    protected spawn({command, options, outputPath}: IFFmpegCommandExecution): ChildProcessWithoutNullStreams {
        this.fileService.deleteFile(outputPath);

        const stream = spawn(command, options);
        return stream;
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: ILoggerStream): void {
        const streamHandler = new HandlersStream(ConsoleLoggerSingleton.getInstance());
        streamHandler.processOutput(stream);
    }
}