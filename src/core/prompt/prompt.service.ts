import inquirer from 'inquirer';
import { PromptType } from './prompt.types';

export class PromptService {
    public async input<T>(message: string, type: PromptType) {
        const { response } = await inquirer.prompt<{ response: T }>([{
                type,
                name: 'response',
                message
        }]);
       
        return response;
    }
}