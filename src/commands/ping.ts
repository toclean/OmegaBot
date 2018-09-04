import { Message } from "discord.js";

export function ping(msg: Message)
{
    msg.channel.send(`🏓 ${msg.client.ping} ms`);
}