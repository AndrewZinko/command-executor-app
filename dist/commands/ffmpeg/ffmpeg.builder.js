export class FFmpegBuilder {
    constructor() {
        this.command = 'ffmpeg';
        this.inputPath = [];
        this.options = [];
        this.options.push('-c:v', 'libx264');
    }
    setInputPath(inputPath) {
        this.inputPath.push('-i', inputPath);
        return this;
    }
    setResolution(width, heigth) {
        this.options.push('-s', `${width}x${heigth}`);
        return this;
    }
    setOutputPath(outputPath) {
        this.outputPath = outputPath;
        return this;
    }
    build() {
        if (!this.inputPath) {
            throw new Error('There is no input path');
        }
        const options = [];
        this.inputPath.forEach(item => options.push(item));
        this.options.forEach(item => options.push(item));
        options.push(this.outputPath);
        return {
            'command': this.command,
            options
        };
    }
}
