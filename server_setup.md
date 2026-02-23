# emergex-crafty-chat-bot

## Server Setup & Plugin Development Guide (Paper / Java)

This document explains:

1. How to set up the Minecraft server correctly (first-time setup)
2. How to rebuild and deploy the plugin safely
3. Beginner-friendly basics for learning Minecraft Java plugin development

---

# Section 1 — Important Development Rules

* Do NOT develop directly on the `main` branch
* Always create a separate branch for your own changes
* The server MUST be **offline** before running `build-plugin.bat`
* Never use `/reload` for plugin testing (causes instability on Paper)
* Always fully restart the server after plugin changes

---

# Section 2 — First-Time Minecraft Server Setup

Follow these steps ONLY the first time setting up the server.

## Step 1 — Initial Server Run (File Generation)

1. Locate `server.jar` in the server directory
2. Double-click or run:

   ```
   server.jar
   ```
3. Wait ~10 seconds

   * This generates required folders (plugins, logs, world, etc.)

Do NOT close immediately. Let it fully initialize.

---

## Step 2 — Accept the EULA

1. Open the file:

   ```
   eula.txt
   ```
2. Find this line:

   ```
   eula=false
   ```
3. Change it to:

   ```
   eula=true
   ```
4. Save and close the file

This step is mandatory or the server will not start.

---

## Step 3 — Start the Server (Proper Run)

1. Run `server.jar` again
2. The server should now start successfully
3. Wait until the console shows:

   ```
   Done (X.Xs)! For help, type "help"
   ```

The server is now fully operational.

To stop the server safely:

```
stop
```

(Type this in the server console)

---

# Section 3 — Rebuilding the Crafty Bot Plugin (Development Workflow)

Any modifications made to the `crafty_bot` plugin will NOT appear automatically.
You must rebuild and redeploy the plugin.

## IMPORTANT

The server MUST be **OFFLINE** before running the build script.

### Correct Workflow

1. Stop the server:

   ```
   stop
   ```
2. Wait until the server fully shuts down
3. Run:

   ```
   build-plugin.bat
   ```
4. Once the script finishes:

   * The plugin jar will be rebuilt
   * The new jar will be moved into the `/plugins` folder automatically
5. Restart the server:

   ```
   server.jar
   ```

Your code changes will now be visible in-game.

---

# Section 4 — Folder Structure (For Reference)

Typical project layout:

```
Server/
├── server.jar
├── build-plugin.bat
├── plugins/
│   └── crafty_bot.jar
└── logs/
```

Plugin project layout:

```
crafty_bot/
├── build.gradle.kts
├── gradlew.bat
├── src/
│   └── main/
│       ├── java/
│       └── resources/
```

---

# Section 5 — Beginner Tutorial: Minecraft Java Plugin Basics

This section is for team members who have never made a Minecraft plugin before.

## 5.1 What is a Minecraft Java Plugin?

A plugin is a Java program that:

* Runs inside the Minecraft server (Paper/Spigot)
* Adds features (commands, events, gameplay mechanics)
* Does NOT modify the game client

Example features:

* Custom commands
* Chat bots
* Economy systems
* Mini-games
* Moderation tools

---

## 5.2 Core Components of Every Plugin

Every Paper plugin requires TWO critical files:

### 1. Main Java Class

This is the entry point of your plugin.

Example:

```java
public final class MyPlugin extends JavaPlugin {
    @Override
    public void onEnable() {
        getLogger().info("Plugin Enabled!");
    }
}
```

This class:

* Loads when the server starts
* Controls all plugin logic

---

### 2. plugin.yml (Mandatory)

Location:

```
src/main/resources/plugin.yml
```

Example:

```yaml
name: CraftyBot
version: 1.0.0
main: com.yourname.craftybot.CraftyBot
api-version: "1.21"
```

If this file is missing or incorrect:

* The plugin will NOT load
* The server will throw an error

---

## 5.3 Basic Plugin Lifecycle (Very Important)

Minecraft plugins follow a lifecycle:

### onEnable()

Runs when:

* Server starts
* Plugin loads

Used for:

* Registering commands
* Loading configs
* Initializing systems

### onDisable()

Runs when:

* Server stops
* Plugin is unloaded

Used for:

* Saving data
* Cleaning resources

---

## 5.4 How Commands Work (Simple Concept)

Plugins can register commands like:

```
/crafty
```

Basic example:

```java
@Override
public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
    sender.sendMessage("Hello from the plugin!");
    return true;
}
```

---

## 5.5 Events (Core of Advanced Plugins)

Events allow your plugin to react to game actions:

* Player join
* Chat messages
* Block breaking
* Mob deaths

Example:

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    event.getPlayer().sendMessage("Welcome to the server!");
}
```

This is how most gameplay features are built.

---

## 5.6 Safe Testing Rules (Industry Standard)

Always follow this order:

1. Stop server
2. Rebuild plugin (`build-plugin.bat`)
3. Start server
4. Test changes

DO NOT:

* Use `/reload`
* Edit jars manually
* Keep multiple versions of the same plugin in `/plugins`

---

## Final Notes for Team

* Keep builds consistent using the provided `.bat` script
* Always test on the dev server, not production
* Commit changes in feature branches
* Restart server after every plugin change for accurate testing

This ensures a stable and professional development workflow.
