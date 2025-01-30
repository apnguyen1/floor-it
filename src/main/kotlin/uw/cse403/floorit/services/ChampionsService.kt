package uw.cse403.floorit.services

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestTemplate
import uw.cse403.floorit.exceptions.ChampionDataException
import uw.cse403.floorit.models.Champion
import uw.cse403.floorit.models.ChampionResponse

@Service
class ChampionsService(
  private val objectMapper: ObjectMapper,
  private val restTemplate: RestTemplate,
) {
    /**
     * Fetches the list of champions from LoL champion API endpoint.
     *
     * @return a mapping of champion names to their champion data
     */
    fun getChampionMappings(): Map<String, Champion> {
        val url =
          "https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json"
        val response: String? =
          try {
              restTemplate.getForObject(url, String::class.java)
          } catch (e: RestClientException) {
              throw ChampionDataException("Failed to fetch champion data from $url", e)
          }

        return response?.let {
            try {
                objectMapper.readValue<ChampionResponse>(it).data
            } catch (e: Exception) {
                throw ChampionDataException("Failed to fetch champion data from $url", e)
            }
        } ?: throw ChampionDataException("Champion data is empty or null")
    }
}
