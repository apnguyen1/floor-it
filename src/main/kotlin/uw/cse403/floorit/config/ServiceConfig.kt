package uw.cse403.floorit.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class ServiceConfig {
    @Bean fun objectMapper(): ObjectMapper = jacksonObjectMapper()

    @Bean fun restTemplate(): RestTemplate = RestTemplate()
}
