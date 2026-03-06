package io.github.craftsensei.events;

import io.github.craftsensei.handlers.ChatMessageHandler;
import java.util.Optional;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.event.ServerChatEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class ChatEvents {

    private final ChatMessageHandler handler;

    public ChatEvents(ChatMessageHandler handler) {
        this.handler = handler;
    }

    @SubscribeEvent
    public void onChat(ServerChatEvent event) {
        ServerPlayer player = event.getPlayer();
        String playerName = player.getGameProfile().getName();
        String message = event.getMessage();

        Optional<String> response = handler.handle(playerName, message);

        response.ifPresent(reply ->
                player.sendSystemMessage(Component.literal(reply))
        );
    }
}