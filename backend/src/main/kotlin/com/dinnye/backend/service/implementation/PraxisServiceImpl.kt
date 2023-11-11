package com.dinnye.backend.service.implementation

import com.dinnye.backend.db.model.Praxis
import com.dinnye.backend.db.repository.PraxisRepository
import com.dinnye.backend.service.interfaces.PraxisService
import com.dinnye.backend.util.findByIdOrThrow
import com.dinnye.backend.util.update
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Isolation
import org.springframework.transaction.annotation.Transactional

@Service
class PraxisServiceImpl(
    private val praxisRepository: PraxisRepository,
): PraxisService {

    @Transactional(isolation = Isolation.SERIALIZABLE)
    override fun create(entity: Praxis): Praxis = praxisRepository.saveAndFlush(entity)

    @Transactional(isolation = Isolation.READ_COMMITTED, readOnly = true)
    override fun get(id: Long): Praxis = praxisRepository.findByIdOrThrow(id)

    @Transactional(isolation = Isolation.READ_COMMITTED, readOnly = true)
    override fun getAll(): List<Praxis> = praxisRepository.findAll()

    @Suppress("DuplicatedCode")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    override fun update(entity: Praxis): Praxis {
        return praxisRepository.update(entity.id!!) {
            entity.name?.let { this.name = it }
            entity.doctor?.let { this.doctor = it }
            entity.assistant?.let { this.assistant = it }
        }
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    override fun delete(id: Long) = praxisRepository.deleteById(id)
}