package contract.genie.resourceserver

import contract.genie.resourceserver.services.FileService
import jakarta.annotation.Resource
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

//@SpringBootApplication(exclude={ DataSourceAutoConfiguration.class})
//@SpringBootApplication(exclude = { dataSourceScriptDatabaseInitializer.class})
@SpringBootApplication
class ContractGenieApplication {
	@Resource
	lateinit var storageService: FileService

	fun run(vararg arg: String?) {
		storageService.init()
	}
}

fun main(args: Array<String>) {
	runApplication<ContractGenieApplication>(*args)
}