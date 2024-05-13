package contract.genie.resourceserver.models

import jakarta.persistence.*

@Entity
@Table(name = "contract")
data class Contract (
    @Id val id: String,
    val name: String,
    @Column(name = "content", length = 1024)
    val content: String,
    val summary: String,
    val subjects: Int,
    val documents: Array<String>,
    val namingConvention: Array<String>
)
/**
 * id -> Identifies the contract
 * name -> Name of the contract
 * content -> Content of the contract
 * summary -> Summary about the contract
 * subjects -> Number of partiesn to the contract
 * documents -> Which documents do you need in this contract
 * namingConvention -> Naming conventions in the contract
* */