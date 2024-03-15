package contract.genie.resourceserver.repositories

import contract.genie.resourceserver.models.FileModel
import org.springframework.data.repository.CrudRepository

interface FileRepository : CrudRepository <FileModel, String>
