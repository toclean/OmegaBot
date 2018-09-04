import { IConfig } from "./IConfig";
import { Logger } from "./Logger";
import { Client } from "discord.js";

export interface IBot
{
    config: IConfig;
    logger: Logger;
    client: Client;
    prefix: string;
}