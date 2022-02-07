import readline from 'readline';
import prompts, { Answers, PromptType } from 'prompts';

class Console {
    private static instance: Console = new Console();
    public lastInputLength: number = 0;

    public consoleLine: readline.ReadLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    constructor() {
        if (Console.instance)
            throw new Error("Instead of using new Console(), please use Console.getInstance() for Singleton!")
        Console.instance = this;
    }

    public static getInstance(): Console {
        return Console.instance;
    }
    
    // TODO: Check if printText and delete boolean are still required
    // Prints single line of text into console
    public printLine(_lines: string, _delete: boolean = false) {
        this.printText([_lines], _delete);
    }

    // Prints multiple lines of text into console
    public printText(_lines: string[], _delete: boolean = false) {
        if (_delete) {
            this.clearConsole();
        }
        _lines.forEach(line => {
            this.consoleLine.write(line);
            this.consoleLine.write("\n");
        });
        if (_delete) {
            this.lastInputLength = _lines.length;
        }
        else {
            this.lastInputLength += _lines.length;
        }
    }

    // Displaying choice options
    public showOptions(_options: string[], _question: string): Promise<Answers<string>> {
        let choices: any[] = [];

        for (let i: number = 1; i <= _options.length; i++) {
            choices.push({ title: _options[i - 1], value: i });
        }
        return prompts({
            type: 'select',
            name: 'value',
            message: _question,
            choices: choices,
            initial: ""
        });
    }

    // Ask for text or number input
    public askForAnswers(_question: string, _type: PromptType): Promise<Answers<string>> {
        return prompts({
            type: _type,
            name: 'value',
            message: _question,
            initial: ""
        });
    }

    // Ask for column in which to place the chip
    public askForChipPlacement(_maxCols: number): Promise<Answers<string>> {
        return prompts({
            type: "number",
            name: "value",
            message: "Where do you want to place your chip?",
            initial: 1,
            min: 1,
            max: _maxCols
        })
    }

    // Clears console
    public clearConsole(): void {
        console.clear();
    }

    // Closes console
    public closeConsole(): void {
        this.printLine("Thank you for playing!");
        this.consoleLine.close();
    }

}

export default Console.getInstance();