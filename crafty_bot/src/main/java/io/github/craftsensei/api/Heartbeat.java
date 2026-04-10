package io.github.craftsensei.api;

import org.yaml.snakeyaml.Yaml;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

import io.github.craftsensei.CraftyBot;

public class Heartbeat implements Runnable {

    @Override
    public void run() {
        try {
            String baseUrl = CraftyBot.getInstance().getConfig().getString("craft-api-base-url");
            String apiKey = CraftyBot.getInstance().getConfig().getString("craft-api-key");
            String serverId = CraftyBot.getInstance().getConfig().getString("craft-server-id");

            if (baseUrl == null || apiKey == null || serverId == null) {
                throw new IllegalStateException("Config values missing!");
            }

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + "/api/servers/" + serverId + "/heartbeat"))
                    .header("Content-Type", "application/json")
                    .header("X-API-Key", apiKey)
                    .POST(HttpRequest.BodyPublishers.noBody())
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            CraftyBot.getInstance().getLogger().info("Heartbeat: " + response.statusCode());

        } catch (Exception e) {
            CraftyBot.getInstance().getLogger().warning("Heartbeat failed: " + e.getMessage());
        }
    }
}