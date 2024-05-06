package contract.genie.resourceserver

import com.ninjasquad.springmockk.MockkBean
import contract.genie.resourceserver.models.Contract
import contract.genie.resourceserver.services.Service
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc

@WebMvcTest
class WebTierTests(@Autowired val mockMvc: MockMvc) {

    @MockkBean
    private lateinit var service: Service

    
}