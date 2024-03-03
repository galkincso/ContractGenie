package contract.genie.resourceserver

import org.springframework.web.bind.annotation.*

@RestController
class ContractController(val service: ContractService) {
    @GetMapping("/")
    fun index(): List<ContractModel> = service.findContracts()

    @GetMapping("/{id}")
    fun index(@PathVariable id: String): List<ContractModel> =
        service.findContractById(id)

    @PostMapping("/")
    fun post(@RequestBody contract: ContractModel) {
        service.save(contract)
    }

    @PutMapping("/{id}")
    fun updateContractById(@PathVariable("id") contractId: String, @RequestBody payload: ContractModel) =
        service.updateContractById(contractId, payload)

    @DeleteMapping("/{id}")
    fun deleteContractById(@PathVariable("id") contractId: String): Unit =
        service.deleteContractById(contractId)
}