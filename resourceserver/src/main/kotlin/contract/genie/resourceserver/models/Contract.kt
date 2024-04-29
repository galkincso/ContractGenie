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
/*
* id -> szerződés azonosítója
* name -> szerződés neve
* content -> szerződés tartalma
* subjects -> hány alanya van a szerződésnek: 1 vagy 2
* documents -> milyen okmányok szükségesek a szerződéshez
* namingConvention -> megszólítások a szerződésben
* */