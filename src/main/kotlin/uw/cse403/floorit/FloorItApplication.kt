package uw.cse403.floorit

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication class FloorItApplication

fun main(args: Array<String>) {
    runApplication<FloorItApplication>(*args)
}
