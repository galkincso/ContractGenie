package contract.genie.resourceserver

import org.springframework.data.repository.CrudRepository

interface ContractRepository : CrudRepository <ContractModel, String>
