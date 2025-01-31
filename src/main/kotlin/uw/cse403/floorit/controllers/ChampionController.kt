package uw.cse403.floorit.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import uw.cse403.floorit.models.ChampionEventDTO
import uw.cse403.floorit.services.ChampionsService

@RestController
class ChampionController(private val championService: ChampionsService) {

    @GetMapping("/champions")
    fun getChampions(): ChampionEventDTO {
        return championService.getChampionMappings() ?: ChampionEventDTO("", emptyMap())
    }
}
