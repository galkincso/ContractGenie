package contract.genie.resourceserver

import jakarta.persistence.*
import org.springframework.web.bind.annotation.*

@Entity
@Table(name = "CONTRACTS")
data class ContractModel(
    @Id val id: String?,
    val name: String
)

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
}