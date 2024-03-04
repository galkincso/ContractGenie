package contract.genie.resourceserver.services

import contract.genie.resourceserver.repositories.ContractRepository
import contract.genie.resourceserver.models.ContractModel
import org.springframework.stereotype.Service
import java.util.*
import org.springframework.boot.context.properties.bind.Bindable.listOf


@Service
class ContractService(val db: ContractRepository) {
    fun findContracts(): List<ContractModel> = db.findAll().toList()
    fun findContractById(id: String): List<ContractModel> = db.findById(id).toList()
    fun save(contract: ContractModel) = db.save(contract)
    fun updateContractById (contractId: String, contract: ContractModel)  {
        if (db.existsById(contractId)) {
            db.save(
                ContractModel(
                id = contractId,
                name = contract.name
            )
            )
            return
        }
    }
    fun deleteContractById (contractId: String) {
        if (db.existsById(contractId)) {
            db.deleteById(contractId)
            return
        }
    }
    fun <T : Any> Optional<out T>.toList(): List<T> =
        if (isPresent) listOf(get()) else Collections.emptyList()
}