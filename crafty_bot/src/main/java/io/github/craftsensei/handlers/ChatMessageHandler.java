package io.github.craftsensei.handlers;

import java.util.Optional;

public interface ChatMessageHandler {
    Optional<String> handle(String playerName, String message);
}