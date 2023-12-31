package com.dinnye.backend.dto._case

import com.dinnye.backend.db.model.Priority
import com.dinnye.backend.db.model.Status
import com.dinnye.backend.dto.ChildInfoDto
import com.dinnye.backend.dto.PraxisInfoDto
import com.dinnye.backend.util.Default
import java.io.Serializable
import java.util.*

data class CaseGetDto @Default constructor(
    val id: Long? = null,
    val createdAt: Date? = null,
    val updatedAt: Date? = null,
    val description: String? = null,
    val praxis: PraxisInfoDto? = null,
    val child: ChildInfoDto? = null,
    val appointmentDate: Date? = null,
    val title: String? = null,
    val priority: Priority = Priority.LOW,
    val status: Status = Status.NEW
) : Serializable