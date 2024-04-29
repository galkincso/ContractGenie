package contract.genie.resourceserver.controllers

import contract.genie.resourceserver.models.Contract
import contract.genie.resourceserver.services.Service
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@CrossOrigin
class Controller (val service: Service) {
// Create
    @PostMapping("/contract/create")
    fun create(@RequestBody contract: Contract) = service.create(contract)

// Read
    @GetMapping("/contract/getall")
    fun getAll() : Iterable<Contract> = service.getAllContracts()

    @GetMapping("/contract/get/{id}")
    fun getIndex(@PathVariable id: String) : Optional<Contract> =
        service.getContractById(id)

// Update
    @PutMapping("/contract/update")
    fun update(@RequestBody body: Contract) =
        service.updateContract(body)

// Delete
    @DeleteMapping("/contract/delete/{id}")
    fun delete(@PathVariable id: String) = service.deleteContract(id)
}