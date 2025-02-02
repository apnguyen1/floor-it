package uw.cse403.floorit.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class AKOperator(val name: String, val imgUrl: String, val profile: String)

@JsonIgnoreProperties(ignoreUnknown = true)
data class AKOperatorResponse(val operators: List<AKOperator>)
