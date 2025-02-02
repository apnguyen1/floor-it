package uw.cse403.floorit.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import uw.cse403.floorit.services.AKOperatorsService
import uw.cse403.floorit.models.AKOperator

@RestController
class AKOperatorController(private val akOperatorsService: AKOperatorsService) {

    @GetMapping("/akOperators")
    fun getAKOperators(): Map<String, AKOperator> {
        val akOperatorMapping = akOperatorsService.getAKOperatorMappings()

        return akOperatorMapping
    } 
}
