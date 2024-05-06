package contract.genie.resourceserver.services

import contract.genie.resourceserver.repositories.Repository
import contract.genie.resourceserver.models.Contract
import contract.genie.resourceserver.repositories.ContractAlreadyExistsException
import contract.genie.resourceserver.repositories.ContractNotFoundException
import org.springframework.stereotype.Service

/**
 * Service for the Contract resource
 */
@Service
class Service (val db: Repository) {

    /**
     * Create
     */
    fun create(contract: Contract) {
        if (db.existsById(contract.id)) {
            throw ContractAlreadyExistsException()
        } else {
            db.save(contract)
        }
    }

    /**
     * Read
     */
    fun getAllContracts() : Iterable<Contract> = db.findAll()
    fun getContractById(id : String) : Contract {
        return db.findById(id).orElseThrow {ContractNotFoundException(id)}
    }

    /**
     * Update
     */
    fun updateContract (contract : Contract) {
        if (db.existsById(contract.id)) {
            db.save(
                Contract(
                    id = contract.id,
                    name = contract.name,
                    content = contract.content,
                    summary = contract.summary,
                    subjects = contract.subjects,
                    documents = contract.documents,
            namingConvention = contract.namingConvention))
            return
        } else throw ContractNotFoundException(contract.id)
    }

    /**
     * Delete
     */
    fun deleteContract(id: String) {
        if (db.existsById(id)) db.deleteById(id)
         else throw ContractNotFoundException(id)
    }
}