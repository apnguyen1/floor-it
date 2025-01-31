package uw.cse403.floorit.controller

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import uw.cse403.floorit.controllers.ChampionController
import uw.cse403.floorit.models.ChampionDTO
import uw.cse403.floorit.models.ChampionEventDTO
import uw.cse403.floorit.models.ChampionImageDTO
import uw.cse403.floorit.services.ChampionsService

@WebMvcTest(controllers = [ChampionController::class])
class ChampionControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc
    @MockkBean
    lateinit var championsService: ChampionsService

    companion object {
        const val VERSION = "15.2.1"
    }

    @Test
    fun `should get all champions`() {
        val champions = mapOf(
            "Aatrox" to ChampionDTO(
                name = "Aatrox",
                title = "The Darkin Blade",
                image = ChampionImageDTO(
                    full = "Aatrox.png",
                    thumbnail = "champion0.png"
                )
            ),
            "Ahri" to ChampionDTO(
                name = "Ahri",
                title = "The Nine-Tailed Fox",
                image = ChampionImageDTO(
                    full = "Ahri.png",
                    thumbnail = "champion1.png"
                )
            )
        )

        every { (championsService.getChampionMappings())} returns ChampionEventDTO(
            version = VERSION,
            data = champions
        )

        mockMvc.perform(get("/champions"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.version").value(VERSION))
            .andExpect(jsonPath("$.data.Aatrox.name").value("Aatrox"))
            .andExpect(jsonPath("$.data.Ahri.name").value("Ahri"))
    }

    @Test
    fun `empty response`() {
        // Mock the service to return null
        every { championsService.getChampionMappings() } returns null

        // Perform the GET request and verify the response
        mockMvc.perform(get("/champions"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.data").isEmpty)
    }
}