package com.dinnye.backend.db.model

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.OneToMany
import jakarta.persistence.OneToOne
import jakarta.persistence.Table

@Entity
@Table(name = "praxis")
class Praxis: BaseEntity() {

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "praxis", cascade = [CascadeType.PERSIST,
        CascadeType.MERGE,
        CascadeType.REMOVE,
        CascadeType.REFRESH,
        CascadeType.DETACH]
    )
    val family: List<Family> = emptyList()

    @OneToOne(mappedBy = "praxis", cascade = [CascadeType.MERGE])
    val doctor: Doctor? = null

    @OneToOne(mappedBy = "praxis", cascade = [CascadeType.MERGE])
    val assistant: Assistant? = null

    @OneToMany(mappedBy = "praxis", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    val case: List<Case> = emptyList()
}