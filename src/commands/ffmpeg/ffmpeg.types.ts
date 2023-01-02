import { ICommandExecution } from "../../core/executor/command.types";

export interface FFmpegInput {
    inputPath: string;
    resolutionWidth: number;
    resolutionHeigth: number;
    fileName: string;
}

export interface IFFmpegCommandExecution extends ICommandExecution {
    outputPath: string
}