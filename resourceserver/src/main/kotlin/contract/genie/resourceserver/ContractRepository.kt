package contract.genie.resourceserver

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.stereotype.Repository

/*@RepositoryRestResource(collectionResourceRel = "contracts", path = "contracts")
interface ContractRepository : CrudRepository<ContractModel, Long> {
}*/

@Repository
interface ContractRepository : CrudRepository <ContractModel, Long> {

}
