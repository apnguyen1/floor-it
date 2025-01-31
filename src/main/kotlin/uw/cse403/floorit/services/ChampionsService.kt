package uw.cse403.floorit.services

import kotlinx.serialization.json.Json
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestTemplate
import uw.cse403.floorit.models.ChampionEventDTO

@Service
class ChampionsService(
  private val json: Json,
  private val restTemplate: RestTemplate, // TODO: change to webflux in future ticket
) {
    companion object {
        const val VERSION = "15.2.1"
    }

    /**
     * Fetches and parses a [ChampionEventDTO]
     */
    fun getChampionMappings(): ChampionEventDTO? {
        val url =
          "https://ddragon.leagueoflegends.com/cdn/$VERSION/data/en_US/champion.json"

        return try {
            val response = restTemplate.getForObject(url, String::class.java)
            response?.let {
                val data = json.decodeFromString<ChampionEventDTO>(it)
                val filteredNames = data.data.mapValues { (_, champ) -> champ.copy(name = champ.name.replace('\'', ' ')) }

                ChampionEventDTO(data.version, filteredNames)
            }
        } catch (e: RestClientException) {
            // TODO, add logging
            null
        }
    }
}
