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

public class Messenger {
    // called from BasicChatMessageHandler
    public CompletableFuture<String> sendToDjango(Player player, String message) {
        Yaml yaml = new Yaml();
        String baseUrl = "";
        String apiKey = "";

        // Load the YAML file from the resources folder
        try (InputStream inputStream = Messenger.class.getClassLoader().getResourceAsStream("config.yml")) {
            if (inputStream == null) {
                System.err.println("YAML file not found in resources folder!");
            }
            // Parse the YAML file into a Map
            Map<String, Object> data = yaml.load(inputStream);

            // Access values by keys
            baseUrl = (String) data.get("craft-api-base-url");
            apiKey = (String) data.get("craft-api-key");

        } catch (Exception e) {
           return CompletableFuture.failedFuture(e);
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
                    .uri(URI.create(baseUrl + "/api/chat/chat/"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
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


