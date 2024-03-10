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
import java.io.IOException
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.Paths


@Controller
@CrossOrigin
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
    fun getFiles(): ResponseEntity<List<String>> {

        val projectDirAbsolutePath = Paths.get("").toAbsolutePath().toString()
        val resourcesPath = Paths.get(projectDirAbsolutePath, "/uploads/")

        var lista = listOf<String>()

        val paths = Files.walk(resourcesPath)
            .filter { item -> Files.isRegularFile(item) }
            .forEach { item -> lista.add(item.fileName.toString())}

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

    @DeleteMapping("/files/delete/{filename:.+}")
    fun deleteFileById(@PathVariable filename: String?) : ResponseEntity<String>? {
        var message = ""
        return try {
            storageService.delete(filename)
            message = "Deleting was successful: " + filename
            ResponseEntity.status(HttpStatus.OK).body("Sikeres törlés")
        } catch (e: Exception) {
            message = "Could not delete the file: " + filename + ". Error: " + e.message
            ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("A törlés nem sikerült")
        }
    }


    /*
    @GetMapping("/analize/{filename:.+}")
    @ResponseBody
    fun getFileData(@PathVariable filename: String?): ResponseEntity<Resource> {
        val file: Resource = storageService.load(filename!!)
        val tess = require('tessaract.js')
        return ResponseEntity.status(HttpStatus.OK).body(file)
    }
    */
}