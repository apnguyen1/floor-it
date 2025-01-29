package uw.cse403.floorit.services

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import kotlin.test.assertFailsWith
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.*
import org.mockito.Mock
import org.mockito.MockitoAnnotations
import org.mockito.kotlin.whenever
import org.springframework.web.client.RestTemplate
import uw.cse403.floorit.exceptions.ChampionDataException

class ChampionServiceTest {
    @Mock private lateinit var restTemplate: RestTemplate
    private val objectMapper = jacksonObjectMapper()
    private lateinit var championsService: ChampionsService

    @BeforeEach
    fun reset() {
        MockitoAnnotations.openMocks(this)
        championsService = ChampionsService(objectMapper, restTemplate)
    }

    @Test
    fun testFetchChampion_success() {
        val mockJson =
          """
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
        """
            .trimIndent()

        whenever(restTemplate.getForObject(any<String>(), eq(String::class.java)))
          .thenReturn(mockJson)

        val champions = championsService.getChampionMappings()

        Assertions.assertNotNull(champions)
        Assertions.assertEquals(2, champions.size)
        Assertions.assertEquals("Aatrox", champions["Aatrox"]?.name)
        Assertions.assertEquals("Ahri", champions["Ahri"]?.name)
    }

    @Test
    fun testFetchChampion_fail() {
        val mockJson = null

        whenever(restTemplate.getForObject(any<String>(), eq(String::class.java)))
          .thenReturn(mockJson)

        assertFailsWith<ChampionDataException> { championsService.getChampionMappings() }
    }
}
