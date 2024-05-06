package contract.genie.resourceserver

import contract.genie.resourceserver.models.Contract
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.boot.test.web.client.postForEntity
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
	@Test
	fun `Test Create endpoint`() {
		val contract = Contract("123_abc-000",
			"Teszt szerződés",
		"Szerződés tartalma",
		"szerződés összegzése",
		2,
			arrayOf("Lakcímkártya"),
			arrayOf("Szolgáltató","Megrendelő"))
		val entity = client.postForEntity<Contract>("/contract/create", contract)
		assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
	}
	@Test
	fun `Test Create endpoint ALREADY EXISTS`() {
		val contract = Contract("123_abc-000",
			"Teszt szerződés",
			"Szerződés tartalma",
			"szerződés összegzése",
			2,
			arrayOf("Lakcímkártya"),
			arrayOf("Szolgáltató","Megrendelő"))
		val entity = client.postForEntity<Contract>("/contract/create", contract)
		assertThat(entity.statusCode).isEqualTo(HttpStatus.CONFLICT)
	}
	@Test
	fun `Test Update endpoint`() {
		val contract = Contract("123_abc-000",
			"Teszt szerződés",
			"Szerződés tartalma MÓDOSÍTVA",
			"szerződés összegzése",
			2,
			arrayOf("Lakcímkártya"),
			arrayOf("Szolgáltató","Megrendelő"))
		val entity = client.getForEntity<String>("/contract/update", contract)
		assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
	}
	@Test
	fun `Test Update endpoint NOT FOUND`() {

	}
	@Test
	fun `Test Delete endpoint`() {

	}
	@Test
	fun `Test Delete endpoint NOT FOUND`() {

	}
}