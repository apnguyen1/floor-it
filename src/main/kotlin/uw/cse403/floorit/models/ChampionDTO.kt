package uw.cse403.floorit.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class Champion(val name: String, val title: String)

@JsonIgnoreProperties(ignoreUnknown = true)
data class ChampionResponse(val data: Map<String, Champion>)
