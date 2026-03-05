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

public class Messenger {
    // called from BasicChatMessageHandler
    public CompletableFuture<String> sendToDjango(Player player, String message) {
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
                    .uri(URI.create("http://localhost:8000/minecraft/chat/"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            // send request to backend server
            return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body)
                    .thenApply(responseBody -> {
                        JsonObject responseJson = gson.fromJson(responseBody, JsonObject.class);
                        return responseJson.get("response").getAsString();
                    });

        } catch (Exception e) {
            return CompletableFuture.failedFuture(e);
        }
    }
}
