package contract.genie.resourceserver.controllers

import contract.genie.resourceserver.models.ContractModel
import contract.genie.resourceserver.services.ContractService
import org.springframework.web.bind.annotation.*
import java.util.Optional

@RestController
class ContractController(val service: ContractService) {
    @GetMapping("/contracts")
    fun index(): List<ContractModel> = service.findContracts()

    @GetMapping("/contract/{id}")
    fun index(@PathVariable id: String): Optional<ContractModel> =
        service.findContractById(id)

    @PostMapping("/contract/save")
    fun post(@RequestBody contract: ContractModel) {
        service.save(contract)
    }

    @PutMapping("/update/{id}")
    fun updateContractById(@PathVariable("id") contractId: String, @RequestBody payload: ContractModel) =
        service.updateContractById(contractId, payload)

    @DeleteMapping("/delete/{id}")
    fun deleteContractById(@PathVariable("id") contractId: String): Unit =
        service.deleteContractById(contractId)
}