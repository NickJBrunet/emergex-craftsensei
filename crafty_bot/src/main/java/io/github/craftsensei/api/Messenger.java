package io.github.craftsensei.api;

// This class is for the minecraft server to communicate to the django server 
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

import org.bukkit.entity.Player;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.yaml.snakeyaml.Yaml;
import java.io.InputStream;
import java.util.Map;

import io.github.craftsensei.CraftyBot;

public class Messenger {
    // called from BasicChatMessageHandler
    public CompletableFuture<String> sendToDjango(Player player, String message) {
        String baseUrl = CraftyBot.getInstance().getConfig().getString("craft-api-base-url");
        String apiKey = CraftyBot.getInstance().getConfig().getString("craft-api-key");
        String serverId = CraftyBot.getInstance().getConfig().getString("craft-server-id");

        if (baseUrl == null || apiKey == null || serverId == null) {
            throw new IllegalStateException("Config values missing!");
        }

        try {
            // declare variables
            HttpClient client = HttpClient.newHttpClient();
            Gson gson = new Gson();

            // create json to send to backend server
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("message", message);
            jsonObject.addProperty("player_uuid", player.getUniqueId().toString());
            jsonObject.addProperty("player_username", player.getName());
            String json = gson.toJson(jsonObject);

            // create request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + "/api/servers/" + serverId + "/chat"))
                    .header("Content-Type", "application/json")
                    .header("X-API-Key", apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            // send request to backend server
            return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(response -> {

                    CraftyBot.getInstance().getLogger().info("HTTP STATUS: " + response.statusCode());
                    CraftyBot.getInstance().getLogger().info("DJANGO RESPONSE: " + response.body());

                    JsonObject responseJson = gson.fromJson(response.body(), JsonObject.class);
                    return responseJson.get("response").getAsString();
                });

        } catch (Exception e) {
            return CompletableFuture.failedFuture(e);
        }
    }
}
