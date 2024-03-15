package contract.genie.resourceserver.services

import contract.genie.resourceserver.repositories.FileRepository
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.stereotype.Service
import org.springframework.util.FileSystemUtils
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.net.MalformedURLException
import java.nio.file.FileAlreadyExistsException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.sql.DriverManager.println
import java.util.stream.Stream

@Service
class FileService (val db : FileRepository) {

    private var root = Paths.get("uploads")

    fun init() {
        try {
            Files.createDirectories(root)
        } catch (e : Exception) {
            throw RuntimeException("Error: ${e.message}")
        }
    }
    fun save(file: MultipartFile) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()))
        } catch (e : Exception) {
            if (e is FileAlreadyExistsException) println("A file of that name already exists")
            else throw RuntimeException("Error: ${e.message}")
        }
    }
    fun load(filename: String): Resource {
        try {
            val file : Path = root.resolve(filename)
            val resource : Resource = UrlResource(file.toUri())
            if (resource.exists() || resource.isReadable) {
                return resource
            } else {
                throw RuntimeException("Could not read the file!")
            }
        } catch (e: MalformedURLException) {
            throw RuntimeException("Error: ${e.message}")
        }
    }
    fun loadAll(): Stream<Path> {
        try {
            return Files.walk(root, 1).filter { path: Path -> path != root }
                .map { other: Path? ->
                    root.relativize(
                        other
                    )
                }
        } catch (e : IOException) {
            throw  RuntimeException("Error: ${e.message}" );
        }
    }

    fun delete(filename: String?) {
        try {
            val file : Path = root.resolve(filename)
            Files.deleteIfExists(file)
        } catch (e: MalformedURLException) {
            throw RuntimeException("Error: ${e.message}")
        }
    }

    fun deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile())
    }
}


