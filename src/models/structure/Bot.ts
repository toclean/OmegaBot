import { IBot } from "./IBot";
import { IConfig } from "./IConfig";
import { Logger } from "./Logger";
import { Client } from "discord.js";

import help from "../../commands/help";

import * as fs from "fs";
import * as path from "path";

export class Bot implements IBot
{
    config!: IConfig;
    logger: Logger;
    client: Client;
    prefix: string = ".";

    loadConfig()
    {
        if (fs.existsSync(path.resolve(__dirname, "../../../config.json")))
            this.config = require("../../../config.json");
        else
            this.logger.Error("Configuration file could not be located");

        if (!this.config.botToken) this.logger.Error("botToken was empty or missing from configuration file");
        if (!this.config.youtubeToken) this.logger.Warn("youtubeToken was empty or missing from configuration file");
        if (this.config.prefix) this.prefix = this.config.prefix;
    }

    connect()
    {
        this.logger.Debug("Attempting to login...");

        this.client.login(this.config.botToken);

        this.client.on("ready", () =>
        {
           this.logger.Success(`Connected as ${this.client.user.tag}!`); 
        });
    }

    handleMessages()
    {
        this.client.on("message", (msg) =>
        {
            if (msg.author.bot || !msg.content.startsWith(this.config.prefix)) return;
            this.logger.Debug(`${msg.content} from ${msg.author.tag}`);

            var query = msg.content;

            switch(true)
            {
                case query.startsWith(this.prefix + "ping"):
                    // Ping code
                    break;
                case query.startsWith(this.prefix + "help"):
                    // Help code
                    help;
                    break;
            }
        });
    }

    constructor()
    {
        this.logger = new Logger();
        this.client = new Client();

        // Load the bot configuration
        this.loadConfig();    
        
        // Handle user messages
        this.handleMessages();
    }
}