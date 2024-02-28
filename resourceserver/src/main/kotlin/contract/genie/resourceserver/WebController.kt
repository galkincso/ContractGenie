package contract.genie.resourceserver

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.beans.factory.annotation.Autowired

import contract.genie.resourceserver.ContractModel
import contract.genie.resourceserver.ContractRepository

@RestController
class WebController {

    @Autowired
    lateinit var repository: ContractRepository

    @RequestMapping("/save")
    fun save() : String {
        repository.save(ContractModel(5, "Teszt2"))

        return "Done"
    }

    @RequestMapping("/findall")
    fun findAll() = repository.findAll()

    //@RequestMapping("/findbyid/{id}")
    //fun findById(@PathVariable id:Long) = repository.findOne(id)
}