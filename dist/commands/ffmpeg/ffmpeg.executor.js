var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor.js";
import { FileService } from "../../core/files/files.service.js";
import { HandlersStream } from "../../core/handlers/handlers.stream.js";
import { PromptService } from "../../core/prompt/prompt.service.js";
import { ConsoleLoggerSingleton } from "../../out/console-logger/console-logger.singleton.js";
import { FFmpegBuilder } from "./ffmpeg.builder.js";
export class FFmpegExecutor extends CommandExecutor {
    constructor(logger) {
        super(logger);
        this.promptService = new PromptService();
        this.fileService = new FileService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const inputPath = yield this.promptService.input('Path to file: ', 'input');
            const resolutionWidth = yield this.promptService.input('Video width: ', 'number');
            const resolutionHeigth = yield this.promptService.input('Video heigth: ', 'number');
            const fileName = yield this.promptService.input('File name: ', 'input');
            return {
                inputPath,
                resolutionWidth,
                resolutionHeigth,
                fileName
            };
        });
    }
    build({ inputPath, resolutionWidth, resolutionHeigth, fileName }) {
        const outputPath = this.fileService.getFilePath(inputPath, fileName, 'mp4');
        const { command, options } = new FFmpegBuilder()
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
    spawn({ command, options, outputPath }) {
        this.fileService.deleteFile(outputPath);
        const stream = spawn(command, options);
        return stream;
    }
    processStream(stream, logger) {
        const streamHandler = new HandlersStream(ConsoleLoggerSingleton.getInstance());
        streamHandler.processOutput(stream);
    }
}
