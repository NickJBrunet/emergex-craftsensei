package io.github.craftsensei;

import io.github.craftsensei.handlers.*;
import io.github.craftsensei.listeners.*;
import io.github.craftsensei.api.*;
import org.bukkit.plugin.java.JavaPlugin;

import org.bukkit.Bukkit;

public final class CraftyBot extends JavaPlugin {

    private static CraftyBot instance;
    public static final String backendUrl = "https://backend-411560433995.northamerica-northeast1.run.app";

    @Override
    public void onEnable() {
        saveDefaultConfig(); // Saves Default Config During Plugin Build

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