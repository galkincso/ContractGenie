package contract.genie.resourceserver.services

import contract.genie.resourceserver.models.Contract
import contract.genie.resourceserver.models.Question
import contract.genie.resourceserver.repositories.ContractAlreadyExistsException
import contract.genie.resourceserver.repositories.ContractNotFoundException
import contract.genie.resourceserver.repositories.Repository
import org.springframework.http.*
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.nio.charset.StandardCharsets
import java.util.stream.Collectors
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType


/**
 * Service for the Contract resource
 */
@Service
class Service (val db: Repository) {

    /**
     * Create
     */
    fun create(contract: Contract): Contract {
        if (db.existsById(contract.id)) throw ContractAlreadyExistsException()
        else return db.save(contract)
    }

    /**
     * Read
     */
    fun getAllContracts() : Iterable<Contract> = db.findAll()
    fun getContractById(id: String) : Contract {
        return db.findById(id).orElseThrow {ContractNotFoundException(id)}
    }

    /**
     * Update
     */
    fun updateContract (contract : Contract): Contract {
        if (db.existsById(contract.id)) {
            return db.save(
                Contract(
                    id = contract.id,
                    name = contract.name,
                    content = contract.content,
                    summary = contract.summary,
                    subjects = contract.subjects,
                    documents = contract.documents,
            namingConvention = contract.namingConvention))

        } else throw ContractNotFoundException(contract.id)
    }

    /**
     * Delete
     */
    fun deleteContract(id: String) {
        if (db.existsById(id)) db.deleteById(id)
         else throw ContractNotFoundException(id)
    }

    /**
     * Question Answer AI
     */
    fun question(body: Question): String? {
        val uri = "http://127.0.0.1:8000/ai"
        val restTemplate = RestTemplate()
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        val requestEntity = HttpEntity(body, headers)

        val response: ResponseEntity<String> = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, String::class.java)
        val responseBody: String? = response.body
        return responseBody
    }



}