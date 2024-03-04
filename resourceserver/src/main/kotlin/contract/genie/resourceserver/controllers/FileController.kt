package contract.genie.resourceserver.controllers

import contract.genie.resourceserver.services.FileService
import org.hibernate.internal.util.collections.CollectionHelper.listOf
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

@Controller
@CrossOrigin("http://localhost:8081")
class FileController {

    @Autowired
    lateinit var storageService: FileService

    @PostMapping("/upload")
    open fun uploadFile(@RequestParam("file") file: MultipartFile): ResponseEntity<String>? {
        var message = ""
        return try {
            storageService.save(file)
            message = "Uploaded the file successfully: " + file.originalFilename
            ResponseEntity.status(HttpStatus.OK).body("Sikeres fájlfeltöltés")
        } catch (e: Exception) {
            message = "Could not upload the file: " + file.originalFilename + ". Error: " + e.message
            ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("A fájlfeltöltés nem sikerült")
        }
    }

    @GetMapping("/files")
    fun getFiles(): ResponseEntity<List<Path>> {

        val projectDirAbsolutePath = Paths.get("").toAbsolutePath().toString()
        val resourcesPath = Paths.get(projectDirAbsolutePath, "/uploads/")

        var lista = listOf<Path>()

        val paths = Files.walk(resourcesPath)
            .filter { item -> Files.isRegularFile(item) }
            .forEach { item -> lista.add(item.fileName)}

        //System.out.println("LISTA"+lista)
        for (it in lista) {
            System.out.println(it)
        }
        //System.out.println("filename: $item")
        return ResponseEntity.status(HttpStatus.OK).body(lista)
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    fun getFile(@PathVariable filename: String?): ResponseEntity<Resource?>? {
        val file: Resource = storageService.load(filename!!)
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
            .body<Resource?>(file)
    }

}