package io.github.craftsensei.handlers;

import java.util.concurrent.CompletableFuture;

import org.bukkit.entity.Player;

public interface ChatMessageHandler {
    CompletableFuture<String> handle(Player player, String message);
}