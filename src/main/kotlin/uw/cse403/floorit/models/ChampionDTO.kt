package uw.cse403.floorit.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ChampionEventDTO(val version: String, val data: Map<String, ChampionDTO>)

@Serializable
data class ChampionDTO(val name: String, val title: String, val image: ChampionImageDTO)

@Serializable
data class ChampionImageDTO(
  val full: String,
  @SerialName("sprite") val thumbnail: String,
)
