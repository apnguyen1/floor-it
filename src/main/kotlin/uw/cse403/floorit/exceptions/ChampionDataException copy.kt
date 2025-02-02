package uw.cse403.floorit.exceptions

class ChampionDataException(
  override val message: String,
  override val cause: Throwable? = null,
) : RuntimeException(message, cause)
