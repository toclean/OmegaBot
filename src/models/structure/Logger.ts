import * as chalk from "chalk";

export class Logger
{
    Warn(msg: string)
    {
        console.log(chalk.default.yellow(msg));
    }

    Error(msg: string)
    {
        let error = chalk.default.bgRed(msg);
        throw new Error(error);
    }

    Debug(msg: string)
    {
        console.log(chalk.default.cyan(msg));
    }

    Success(msg: string)
    {
        console.log(chalk.default.green(msg));
    }
}