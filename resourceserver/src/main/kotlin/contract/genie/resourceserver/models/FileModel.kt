package contract.genie.resourceserver.models

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class FileModel(
    @Id val id: String?,
    val name: String,
    val url: String
)