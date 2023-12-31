package com.dinnye.backend.service.interfaces

import com.dinnye.backend.db.model.Family

interface FamilyService: SimpleCrudService<Family> {
    fun getAll(email: String): List<Family>
}