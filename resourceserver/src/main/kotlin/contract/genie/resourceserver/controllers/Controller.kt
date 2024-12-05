package contract.genie.resourceserver.controllers

import contract.genie.resourceserver.models.Contract
import contract.genie.resourceserver.models.Question
import contract.genie.resourceserver.services.Service
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@CrossOrigin
class Controller (val service: Service) {

    /**
     * Create endpoint
     */
    @PostMapping("/contract/create")
    fun create(@RequestBody contract: Contract) : ResponseEntity<Contract> {
        return ResponseEntity.ok(service.create(contract))
    }

    /**
     * Read all contract endpoint
     */
    @GetMapping("/contract/getall")
    fun getAll() : Iterable<Contract> = service.getAllContracts()

    /**
     * Read one contract by ID endpoint
     */
    @GetMapping("/contract/get/{id}")
    fun getIndex(@PathVariable id: String) : Contract = service.getContractById(id)

    /**
     * Update endpoint
     */
    @PutMapping("/contract/update")
    fun update(@RequestBody body: Contract) : ResponseEntity<Contract> {
        return ResponseEntity.ok(service.updateContract(body))
    }

    /**
     * Delete endpoint
     */
    @DeleteMapping("/contract/delete/{id}")
    fun delete(@PathVariable id: String) = service.deleteContract(id)

    /**
     * Question-Answer endpoint
     */
    @GetMapping("/contract/ai")
    fun question(@RequestBody body: Question) : ResponseEntity<String?> {
        return ResponseEntity.ok(service.question(body))
    }
}