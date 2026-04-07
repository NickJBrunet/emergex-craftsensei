package io.github.craftsensei.api;

import org.yaml.snakeyaml.Yaml;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

public class Heartbeat implements Runnable {

    @Override
    public void run() {
        Yaml yaml = new Yaml();
        String baseUrl = "";
        String apiKey = "";
        String serverId = "";

        try (InputStream inputStream = Heartbeat.class.getClassLoader().getResourceAsStream("config.yml")) {
            if (inputStream == null) return;
            Map<String, Object> data = yaml.load(inputStream);
            baseUrl   = (String) data.get("craft-api-base-url");
            apiKey    = (String) data.get("craft-api-key");
            serverId  = (String) data.get("craft-server-id");
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        try {
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