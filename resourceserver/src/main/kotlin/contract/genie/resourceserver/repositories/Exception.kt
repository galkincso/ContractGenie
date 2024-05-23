package contract.genie.resourceserver.repositories

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

class ContractNotFoundException(id: String) :
    Exception("Contract with id = $id not found")
class ContractAlreadyExistsException() :
    Exception("This Contract already exists")

@RestControllerAdvice
class ControllerAdvice {
    @ExceptionHandler
    fun handleContractNotFoundException(ex: ContractNotFoundException): ResponseEntity<ErrorMessage> {
        val errorMessage = ErrorMessage(
            ex.message, HttpStatus.NOT_FOUND.toString(),
        )
        return ResponseEntity(errorMessage, HttpStatus.NOT_FOUND)
    }
    @ExceptionHandler
    fun handleContractAlreadyExistsException(ex: ContractAlreadyExistsException): ResponseEntity<ErrorMessage> {
        val errorMessage = ErrorMessage(
            ex.message, HttpStatus.CONFLICT.toString(),
        )
        return ResponseEntity(errorMessage, HttpStatus.CONFLICT)
    }
}
class ErrorMessage(
    var message: String?,
    var status: String
)