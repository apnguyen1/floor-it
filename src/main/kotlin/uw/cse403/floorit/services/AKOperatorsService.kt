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
                objectMapper.readValue<AKOperatorResponse>(it).operators.associateBy {it.name}
            } catch (e: Exception) {
                throw AKOperatorDataException("Failed to fetch Arknights operator data from $url", e)
            }
        } ?: throw AKOperatorDataException("Arknights operator data is empty or null")
    }
}
