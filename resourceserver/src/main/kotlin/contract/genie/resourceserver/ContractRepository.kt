package contract.genie.resourceserver

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "contracts", path = "contracts")
interface ContractRepository : CrudRepository<ContractModel, Long> {
}