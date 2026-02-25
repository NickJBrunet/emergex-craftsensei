package io.github.craftsensei.listeners;

import io.github.craftsensei.handlers.ChatMessageHandler;
import io.papermc.paper.event.player.AsyncChatEvent;
import net.kyori.adventure.text.serializer.plain.PlainTextComponentSerializer;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;

public class PlayerMessageEvent implements Listener {

    private final ChatMessageHandler handler;

    public PlayerMessageEvent(ChatMessageHandler handler) {
        this.handler = handler;
    }

    @EventHandler(priority = EventPriority.MONITOR)
    public void onChat(AsyncChatEvent event) {
        String playerName = event.getPlayer().getName();
        String message = PlainTextComponentSerializer.plainText().serialize(event.message());

        System.out.println("[CraftyBot] " + playerName + ": " + message);

        handler.handle(playerName, message);
    }
}