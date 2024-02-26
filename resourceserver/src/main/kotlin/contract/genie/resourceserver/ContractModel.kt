package contract.genie.resourceserver

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
data class ContractModel (
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = -1,
    var name: String
) {}