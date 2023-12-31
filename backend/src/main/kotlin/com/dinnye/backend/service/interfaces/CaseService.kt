package com.dinnye.backend.service.interfaces

import com.dinnye.backend.db.model.Case

interface CaseService: SimpleCrudService<Case> {
    fun getAllByEmail(email: String): List<Case>
}