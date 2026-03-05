package io.github.craftsensei.listeners;

import io.github.craftsensei.handlers.ChatMessageHandler;
import io.papermc.paper.event.player.AsyncChatEvent;
import net.kyori.adventure.text.serializer.plain.PlainTextComponentSerializer;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;
import java.util.concurrent.CompletableFuture;

public class PlayerMessageEvent implements Listener {

    private final ChatMessageHandler handler;
    private final JavaPlugin plugin;

    public PlayerMessageEvent(ChatMessageHandler handler, JavaPlugin plugin) {
        this.handler = handler;
        this.plugin = plugin;
    }

    @EventHandler(priority = EventPriority.MONITOR)
    public void onChat(AsyncChatEvent event) {
        Player player = event.getPlayer();
        String message = PlainTextComponentSerializer.plainText().serialize(event.message());

        // Bukkit.getLogger().info("[CraftyBot] " + playerName + ": " + message);

        CompletableFuture<String> response = handler.handle(player, message);

        response
                .thenAccept(value -> {
                    if (value == null){
                        return;
                    }
                    Bukkit.getScheduler().runTask(plugin, () -> {
                        player.sendMessage(value);
                    });
                })
                .exceptionally(ex -> {
                    Bukkit.getScheduler().runTask(plugin, () -> {
                        player.sendMessage("§cAI request failed.");
                    });
                    ex.printStackTrace();
                    return null;
                });
    }
}
