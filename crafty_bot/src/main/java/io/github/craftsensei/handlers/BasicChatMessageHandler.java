package io.github.craftsensei.handlers;

import java.util.Optional;

public class BasicChatMessageHandler implements ChatMessageHandler {

    private final String trigger;

    public BasicChatMessageHandler(String trigger) {
        this.trigger = trigger;
    }

    @Override
    public Optional<String> handle(String playerName, String message) {
        if (message == null) return Optional.empty();

        String trimmed = message.trim();
        if (trimmed.isEmpty()) return Optional.empty();

        if (!startsWithTrigger(trimmed)) return Optional.empty();

        String content = removeTrigger(trimmed);
        if (content.isEmpty()) {
            return Optional.of("Try: " + trigger + " how do I craft a chest?");
        }

        return Optional.of("Got it, " + playerName + ". You said: " + content);
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