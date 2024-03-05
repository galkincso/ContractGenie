package contract.genie.resourceserver.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.Date

@Entity
@Table(name = "files")
data class FileModel(
    @Id val id: String?,
    val name: String,
    val url: String,
    val date: Date
)