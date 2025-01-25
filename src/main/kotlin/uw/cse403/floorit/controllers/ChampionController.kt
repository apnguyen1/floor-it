package uw.cse403.floorit.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import uw.cse403.floorit.services.ChampionsService

@RestController
class ChampionController(private val championService: ChampionsService) {

    @GetMapping("/champions")
    fun getChampions(): Map<String, String> {
        val championMapping = championService.getChampionMappings()

        return championMapping.mapValues { (_, championData) -> championData.title }
    }
}
