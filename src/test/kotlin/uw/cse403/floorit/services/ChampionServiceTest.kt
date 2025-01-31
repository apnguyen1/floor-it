package uw.cse403.floorit.services

import io.mockk.every
import io.mockk.junit5.MockKExtension
import io.mockk.mockk
import kotlinx.serialization.json.Json
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.web.client.RestTemplate

@ExtendWith(MockKExtension::class)
class ChampionServiceTest {
    private val restTemplate: RestTemplate = mockk()
    private val json: Json = Json { ignoreUnknownKeys = true }
    private val championsService: ChampionsService = ChampionsService(json, restTemplate)

    companion object {
        const val VERSION = "15.2.1"
    }

    @Test
    fun `fetch all champions`() {
        val mockJson = """
            {
            "version": "$VERSION",
            "data": {
                "Aatrox": {
                    "id": "Aatrox",
                    "name": "Aatrox",
                    "title": "the Darkin Blade",
                    "blurb": "Once honored defenders of Shurima...",
                    "image": {
                        "full": "Aatrox.png",
                        "sprite": "champion1.png"
                    }
                },
                "Ahri": {
                    "id": "Ahri",
                    "name": "Ahri",
                    "title": "the Nine-Tailed Fox",
                    "blurb": "Innately connected to the latent...",
                    "image": {
                        "full": "Ahri.png",
                        "sprite": "champion2.png"
                    }
                }
            }
        }
        """.trimIndent()

        every { restTemplate.getForObject(any<String>(), String::class.java) } returns mockJson

        val champions = championsService.getChampionMappings()

        Assertions.assertNotNull(champions)
        Assertions.assertEquals(2, champions?.data?.size)
        Assertions.assertEquals(VERSION, champions?.version)
        Assertions.assertEquals("Aatrox", champions?.data?.get("Aatrox")?.name)
        Assertions.assertEquals("Aatrox.png", champions?.data?.get("Aatrox")?.image?.full)
    }

    @Test
    fun `return null and doesn't throw exception`() {
        every { restTemplate.getForObject(any<String>(), String::class.java) } returns null

        Assertions.assertNull(championsService.getChampionMappings())
        Assertions.assertDoesNotThrow { championsService.getChampionMappings() }
    }
}
