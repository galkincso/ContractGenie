package contract.genie.resourceserver

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.http.HttpStatus

@SpringBootTest (webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ContractGenieApplicationTests (@Autowired val client: TestRestTemplate) {

	@Test
	fun contextLoads() {
	}
	@Test
	fun `Test GetAll endpoint`() {
		val entity = client.getForEntity<String>("/contract/getall")
		assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
		assertThat(entity.body).contains("name")
	}
	@Test
	fun `Test GetById endpoint`() {
		val id = "d9e9cd44-cf51-4503-bcfc-efb0f0931cf0"
		val entity = client.getForEntity<String>("/contract/get/$id")
		assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
		assertThat(entity.body).contains("name")
	}
	@Test
	fun `Test GetById endpoint NOT FOUND`() {
		val id = "123abc"
		val entity = client.getForEntity<String>("/contract/get/$id")
		assertThat(entity.statusCode).isEqualTo(HttpStatus.NOT_FOUND)
	}
}