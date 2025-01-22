package uw.cse403.floorit

import org.springframework.boot.fromApplication
import org.springframework.boot.with

fun main(args: Array<String>) {
    fromApplication<FloorItApplication>()
      .with(TestcontainersConfiguration::class)
      .run(*args)
}
