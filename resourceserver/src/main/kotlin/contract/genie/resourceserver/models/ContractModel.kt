package contract.genie.resourceserver.models

import jakarta.persistence.*

@Entity
@Table(name = "contracts")
data class ContractModel(
    @Id val id: String?,
    val name: String,
    val fileName: String
)