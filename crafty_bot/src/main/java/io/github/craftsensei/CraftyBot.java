package io.github.craftsensei;

import org.bukkit.plugin.java.JavaPlugin;

public final class CraftyBot extends JavaPlugin {

    @Override
    public void onEnable() {
        getLogger().info("Plugin Enabled!");
    }

    @Override
    public void onDisable() {
        getLogger().info("Plugin Disabled!");
    }
}