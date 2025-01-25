package uw.cse403.floorit.services

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import uw.cse403.floorit.exceptions.ChampionDataException
import uw.cse403.floorit.models.Champion

@Service
class ChampionsService {
    private val restTemplate = RestTemplate()

    private val objectMapper = jacksonObjectMapper()

    /**
     * Fetches the list of champions from LoL champion API endpoint.
     *
     * @return a mapping of champion names to their champion data
     */
    fun getChampionMappings(): Map<String, Champion> {
        val url =
          "https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json"
        val response =
          try {
              restTemplate.getForObject(url, String::class.java)
          } catch (e: Exception) {
              throw ChampionDataException("Failed to fetch champion data from $url", e)
          }

        response?.let {
            val champRes: Map<String, Champion> =
              try {
                  objectMapper.readValue(it)
              } catch (e: Exception) {
                  throw ChampionDataException(
                    "Failed to parse champion response from $url",
                    e,
                  )
              }

            return champRes.mapValues { (_, champion) -> champion }
        } ?: throw ChampionDataException("Champion data is empty or null")
    }
}
