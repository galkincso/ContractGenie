package contract.genie.resourceserver.repositories

import contract.genie.resourceserver.models.ContractModel
import org.springframework.data.repository.CrudRepository

interface ContractRepository : CrudRepository <ContractModel, String>
