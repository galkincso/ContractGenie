package contract.genie.resourceserver

import jakarta.persistence.*

@Entity
@Table(name = "contracts")
data class ContractModel(
    @Id val id: String?,
    val name: String
)