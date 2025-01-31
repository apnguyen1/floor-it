package uw.cse403.floorit.config

import kotlinx.serialization.json.Json
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class ServiceConfig {
    @Bean fun json(): Json = Json { ignoreUnknownKeys = true }

    @Bean fun restTemplate(): RestTemplate = RestTemplate()
}
