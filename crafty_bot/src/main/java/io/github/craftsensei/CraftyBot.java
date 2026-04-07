package io.github.craftsensei;

import io.github.craftsensei.handlers.BasicChatMessageHandler;
import io.github.craftsensei.handlers.ChatMessageHandler;
import io.github.craftsensei.listeners.PlayerMessageEvent;
import org.bukkit.plugin.java.JavaPlugin;

public final class CraftyBot extends JavaPlugin {

    private static CraftyBot instance;

    @Override
    public void onEnable() {
        ChatMessageHandler handler = new BasicChatMessageHandler("crafty");

        getServer().getPluginManager().registerEvents(new PlayerMessageEvent(handler,this),this);

        Bukkit.getScheduler().runTaskTimerAsynchronously(this, new Heartbeat(), 0L, 600L);

        getLogger().info("Plugin Enabled!");

        instance = this;
    }

    @Override
    public void onDisable() {
        getLogger().info("Plugin Disabled!");
    }

    public static CraftyBot getInstance() {
        return instance;
    }
} 