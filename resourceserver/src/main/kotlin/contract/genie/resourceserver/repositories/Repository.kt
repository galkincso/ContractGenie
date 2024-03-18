package contract.genie.resourceserver.repositories

import contract.genie.resourceserver.models.Contract
import org.springframework.data.repository.CrudRepository

interface Repository : CrudRepository <Contract, String>