package contract.genie.resourceserver

import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import contract.genie.resourceserver.models.Contract
import contract.genie.resourceserver.services.Service
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@AutoConfigureMockMvc
@SpringBootTest
class WebTierTests(
    @Autowired val mockMvc: MockMvc,
    @Autowired val objectMapper: ObjectMapper) {

    @Test
    fun test_GetContractById_Ok() {

        this.mockMvc.perform(get("/contract/get/1"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.content").value("Content"))
    }
    @Test
    fun test_GetContractById_NotFound() {

        this.mockMvc.perform(get("/contract/get/100"))
            .andExpect(status().isNotFound)
    }
    @Test
    fun test_CreateContract_Ok() {
        val newContract = Contract("1", "Teszt", "Content", "Summary", 2, arrayOf("Lakcímkártya"), arrayOf("Szolgáltató","Megrendelő"))

        mockMvc.perform(post("/contract/create").content(objectMapper.writeValueAsString(newContract)).contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Teszt"))
    }
    @Test
    fun test_CreateContract_Conflict() {
        val newContract = Contract("1", "Teszt", "Content", "Summary", 2, arrayOf("Lakcímkártya"), arrayOf("Szolgáltató","Megrendelő"))

        mockMvc.perform(post("/contract/create").content(objectMapper.writeValueAsString(newContract)).contentType(MediaType.APPLICATION_JSON))
        mockMvc.perform(post("/contract/create").content(objectMapper.writeValueAsString(newContract)).contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isConflict)
    }
    @Test
    fun test_UpdateContract_Ok() {
        val newContract = Contract("1", "Teszt", "Content", "Summary", 2, arrayOf("Lakcímkártya"), arrayOf("Szolgáltató","Megrendelő"))
        val updatedContract = Contract("1", "Updated Teszt", "Content", "Summary", 2, arrayOf("Lakcímkártya"), arrayOf("Szolgáltató","Megrendelő"))


        mockMvc.perform(post("/contract/create").content(objectMapper.writeValueAsString(newContract)).contentType(MediaType.APPLICATION_JSON))
        mockMvc.perform(put("/contract/update").content(objectMapper.writeValueAsString(updatedContract)).contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Updated Teszt"))
    }
    @Test
    fun test_UpdateContract_NotFound() {
        val contract = Contract("100", "Random", "Content", "Summary", 2, arrayOf("Lakcímkártya"), arrayOf("Szolgáltató","Megrendelő"))

        mockMvc.perform(put("/contract/update").content(objectMapper.writeValueAsString(contract)).contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound)
    }
    @Test
    fun test_DeleteContract_Ok() {
        this.mockMvc.perform(delete("/contract/delete/1"))
            .andExpect(status().isOk)
    }
    @Test
    fun test_DeleteContract_NotFound() {
        this.mockMvc.perform(delete("/contract/delete/100"))
            .andExpect(status().isNotFound)
    }
}