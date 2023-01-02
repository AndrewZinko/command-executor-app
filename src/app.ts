import { FFmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor.js";
import { ConsoleLoggerSingleton } from "./out/console-logger/console-logger.singleton.js";

export class App {
    async run() {
        new FFmpegExecutor(ConsoleLoggerSingleton.getInstance()).execute();
    }
}

const app = new App();
app.run();