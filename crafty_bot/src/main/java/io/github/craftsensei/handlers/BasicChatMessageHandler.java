package io.github.craftsensei.handlers;

import java.util.concurrent.CompletableFuture;

import org.bukkit.entity.Player;

import io.github.craftsensei.api.Messenger;

public class BasicChatMessageHandler implements ChatMessageHandler {

    private final String trigger;

    public BasicChatMessageHandler(String trigger) {
        this.trigger = trigger;
    }

    // Called from PlayerMessageEvent
    @Override
    public CompletableFuture<String> handle(Player player, String message) {
        String trimmed = message.trim();
        if (!startsWithTrigger(trimmed))
            return CompletableFuture.completedFuture(null);

        String content = removeTrigger(trimmed);
        if (content.isEmpty()) {
            return CompletableFuture.completedFuture("Try: " + trigger + " how do I craft a chest?");
        }

        Messenger messenger = new Messenger();
        return messenger.sendToDjango(player, message);
    }

    private boolean startsWithTrigger(String message) {
        return message.toLowerCase().startsWith(trigger.toLowerCase());
    }

    private String removeTrigger(String message) {
        String result = message.substring(trigger.length()).trim();
        if (result.startsWith(":")) {
            result = result.substring(1).trim();
        }
        return result;
    }
}