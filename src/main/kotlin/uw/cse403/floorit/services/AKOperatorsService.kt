package uw.cse403.floorit.services

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestTemplate
import uw.cse403.floorit.exceptions.AKOperatorDataException
import uw.cse403.floorit.models.AKOperator
import uw.cse403.floorit.models.AKOperatorResponse

@Service
class AKOperatorsService(
  private val objectMapper: ObjectMapper,
  private val restTemplate: RestTemplate,
) {
    companion object {
        const val WORKING_IMG_URL = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/characters/"
    }
    /**
     * Fetches the list of Arknights operators from arknights API endpoint.
     *
     * @return a mapping of operator names to their data
     */
    fun getAKOperatorMappings(): Map<String, AKOperator> {
        val url =
          "https://www.arknightsapi.com/v1/operators"
        val response: String? =
          try {
              restTemplate.getForObject(url, String::class.java)
          } catch (e: RestClientException) {
              throw AKOperatorDataException("Failed to fetch Arknights operator data from $url", e)
          }
        return response?.let {
            try {
                val operators = objectMapper.readValue<AKOperatorResponse>(it).operators.associateBy {it.name}.toMutableMap()

                // Removes any operators with chinese profile descriptions or image urls
                operators.values.removeAll { operator ->
                    operator.profile.any { char -> char.code in 0x4E00..0x9FFF } ||
                    "%" in operator.imgUrl
                }

                // Changes the broken image url to a non-broken one hosted on github
                operators.entries.forEach { entry ->
                    entry.setValue(entry.value.copy(imgUrl = "$WORKING_IMG_URL${entry.value.imgUrl.substringAfterLast('/')}"))
                }

                // Censor operator names in profiles
                operators.entries.forEach { entry ->
                    val censoredProfile = entry.value.profile.replace(Regex("(?i)${Regex.escape(entry.key)}", RegexOption.IGNORE_CASE), "*".repeat(entry.key.length))
                    entry.setValue(entry.value.copy(profile = censoredProfile))
                }

                operators
            } catch (e: Exception) {
                throw AKOperatorDataException("Failed to fetch Arknights operator data from $url", e)
            }
        } ?: throw AKOperatorDataException("Arknights operator data is empty or null")
    }
}
