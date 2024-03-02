package contract.genie.resourceserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.bind.Bindable.listOf
import org.springframework.boot.runApplication
import org.springframework.stereotype.Service
import java.util.*
import java.util.Collections.emptyList


@SpringBootApplication
class ContractGenieApplication

fun main(args: Array<String>) {
	runApplication<ContractGenieApplication>(*args)
}

@Service
class ContractService(val db: ContractRepository) {
	fun findContracts(): List<ContractModel> = db.findAll().toList()
	fun findContractById(id: String): List<ContractModel> = db.findById(id).toList()
	fun save(contract: ContractModel) = db.save(contract)

	fun <T : Any> Optional<out T>.toList(): List<T> =
		if (isPresent) listOf(get()) else emptyList()

}

