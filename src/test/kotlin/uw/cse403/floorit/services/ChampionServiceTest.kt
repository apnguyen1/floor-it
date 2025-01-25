package uw.cse403.floorit.services

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.junit.Test
import org.mockito.Mock
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.web.client.RestTemplate

class ChampionServiceTest {
    @Mock
    private val restTemplate = RestTemplate()
    private val objectMapper = jacksonObjectMapper()
    private val championsService = ChampionsService()


    @Test
    fun testFetchChampion_success() {
        val mockJson = """
            {
            "data": {
                "Aatrox": {
                    "id": "Aatrox",
                    "name": "Aatrox",
                    "title": "the Darkin Blade",
                    "blurb": "Once honored defenders of Shurima..."
                },
                "Ahri": {
                    "id": "Ahri",
                    "name": "Ahri",
                    "title": "the Nine-Tailed Fox",
                    "blurb": "Innately connected to the latent..."
                }
            }
        }
        """.trimIndent()


    }
}