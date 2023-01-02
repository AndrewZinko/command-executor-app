import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";

export class FileService {
    private async isExists(path: string) {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    }

    public getFilePath(path: string, name: string, extension: string): string {
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path);
        }

        return join(dirname(path) + '/' + name + '.' + extension);
    }

    public async deleteFile(path: string): Promise<void> {
        if (await this.isExists(path)) {
            promises.unlink(path);
        }
    }
}