package io.github.craftsensei;

import io.github.craftsensei.events.ChatEvents;
import io.github.craftsensei.handlers.BasicChatMessageHandler;
import io.github.craftsensei.handlers.ChatMessageHandler;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.common.Mod;

@Mod("craftybot")
public class CraftyBot {

    private final ChatMessageHandler handler;

    public CraftyBot() {
        handler = new BasicChatMessageHandler("crafty");
        MinecraftForge.EVENT_BUS.register(new ChatEvents(handler));
    }
}