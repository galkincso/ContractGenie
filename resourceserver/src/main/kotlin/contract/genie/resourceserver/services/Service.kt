package contract.genie.resourceserver.services

import contract.genie.resourceserver.repositories.Repository
import contract.genie.resourceserver.models.Contract
import org.springframework.stereotype.Service
import java.util.*

@Service
class Service (val db: Repository) {
// Create
    fun create(contract: Contract) = db.save(contract)

// Read
    fun getAllContracts() : Iterable<Contract> = db.findAll()
    fun getContractById(id : String) : Optional<Contract> = db.findById(id)

// Update
    fun updateContract (contract : Contract) {
        if (db.existsById(contract.id)) {
            db.save(
                Contract(
                    id = contract.id,
                    name = contract.name,
                    content = contract.content,
                    summary = contract.summary,
                    subjects = contract.subjects,
                    documentId = contract.documentId))
            return
        }
    }

// Delete
    fun deleteContract(id: String) {
        if (db.existsById(id)) {
            db.deleteById(id)
            return
        }
    }
}