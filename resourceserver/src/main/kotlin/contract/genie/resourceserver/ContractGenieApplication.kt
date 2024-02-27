package contract.genie.resourceserver

import org.springframework.boot.ApplicationRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class ContractGenieApplication {
	/*@Bean
	fun run (repository: ContractRepository) = ApplicationRunner {
		repository.save(ContractModel(
			name = "Munkaszerződés"
		))
		repository.save(ContractModel(
			name = "Adásvételi szerződés"
		))
		repository.save(ContractModel(
			name = "Bérleti szerződés"
		))
	}*/
}

fun main(args: Array<String>) {
	runApplication<ContractGenieApplication>(*args)
}
