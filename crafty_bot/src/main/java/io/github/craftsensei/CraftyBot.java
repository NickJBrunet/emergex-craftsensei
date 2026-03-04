package io.github.craftsensei;

import io.github.craftsensei.handlers.BasicChatMessageHandler;
import io.github.craftsensei.handlers.ChatMessageHandler;
import io.github.craftsensei.listeners.PlayerMessageEvent;
import org.bukkit.plugin.java.JavaPlugin;

public final class CraftyBot extends JavaPlugin {

    @Override
    public void onEnable() {
        ChatMessageHandler handler = new BasicChatMessageHandler("crafty");

        getServer().getPluginManager().registerEvents(
                new PlayerMessageEvent(handler),
                this
        );

        getLogger().info("Plugin Enabled!");
    }

    @Override
    public void onDisable() {
        getLogger().info("Plugin Disabled!");
    }
}