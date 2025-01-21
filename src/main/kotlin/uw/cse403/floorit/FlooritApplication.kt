package uw.cse403.floorit

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FlooritApplication

fun main(args: Array<String>) {
    runApplication<FlooritApplication>(*args)
}
