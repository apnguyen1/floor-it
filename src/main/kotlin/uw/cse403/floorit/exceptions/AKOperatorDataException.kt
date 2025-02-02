package uw.cse403.floorit.exceptions

class AKOperatorDataException(
  override val message: String,
  override val cause: Throwable? = null,
) : RuntimeException(message, cause)
