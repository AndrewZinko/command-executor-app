import { ICommandExecution } from "../../core/executor/command.types";

export class FFmpegBuilder {
    private command: string = 'ffmpeg';
    private inputPath: string[] = [];
    private outputPath: string;
    private options: string[] = [];

    constructor() {
        this.options.push('-c:v', 'libx264');
    }

    public setInputPath(inputPath: string): this {
        this.inputPath.push('-i', inputPath);
        return this;
    }

    public setResolution(width: number, heigth: number): this {
        this.options.push('-s', `${width}x${heigth}`);
        return this;
    }

    public setOutputPath(outputPath: string): this {
        this.outputPath = outputPath;
        return this;
    }

    public build(): ICommandExecution {
        if (!this.inputPath) {
            throw new Error('There is no input path');
        }

        const options: string[] = [];

        this.inputPath.forEach(item => options.push(item));
        this.options.forEach(item => options.push(item));

        options.push(this.outputPath);
        
        return {
            'command': this.command,
            options
        }
    }
}