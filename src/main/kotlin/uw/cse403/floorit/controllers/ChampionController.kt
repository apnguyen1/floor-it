package uw.cse403.floorit.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import uw.cse403.floorit.services.ChampionsService

@RestController
class ChampionController(private val championService: ChampionsService) {

    @GetMapping("/champions")
    fun getChampions(): Map<String, List<String>> {
        val championMapping = championService.getChampionMappings()

        return championMapping
          .mapKeys { (_, championData) -> championData.title }
          .mapValues { (_, championData) -> listOf(championData.name) }
    }
}
