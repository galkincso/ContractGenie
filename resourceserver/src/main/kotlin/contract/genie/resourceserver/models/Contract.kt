package contract.genie.resourceserver.models

import jakarta.persistence.*
import java.awt.TextArea

@Entity
@Table(name = "contract")
data class Contract (
    @Id val id: String,
    val name: String,
    @Column(name = "content", length = 1024)
    val content: String,
    val summary: String,
    val subjects: Int,
    val documentId: Int
)
/*
* id -> szerződés azonosítója
* name -> szerződés neve
* content -> szerződés tartalma
* subjects -> hány alanya van a szerződésnek: 1 vagy 2
* documentId -> milyen okmányok szükségesek a szerződéshez
*   1 -> adóigazolvány
*   2 -> lakcímkártya
*   3 -> személyi igazolvány
*   4 -> adóigazolvány + lakcímkártya
*   5 -> adóigazolvány + személyi igazolvány
*   6 -> lakcímkártya + személyi igazolvány
* */